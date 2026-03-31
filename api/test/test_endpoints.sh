#!/bin/bash

BASE_URL="http://localhost:4000/api"

# ============================================================
# SETUP — register accounts to get tokens
# ============================================================

echo "--- SETUP ---"

# Register a company admin
COMPANY_REGISTER=$(curl -s -X POST $BASE_URL/auth/company/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@acme.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "companyName": "Acme Corp"
  }')
echo "Company register: $COMPANY_REGISTER"
COMPANY_TOKEN=$(echo $COMPANY_REGISTER | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
echo "Company token: $COMPANY_TOKEN"

# Register a second user to invite as member
MEMBER_REGISTER=$(curl -s -X POST $BASE_URL/auth/company/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "member@acme.com",
    "password": "password123",
    "firstName": "Jane",
    "lastName": "Smith",
    "companyName": "Member Corp"
  }')
echo "Member register: $MEMBER_REGISTER"

# ============================================================
# COMPANY ROUTES
# ============================================================

echo ""
echo "--- COMPANY ROUTES ---"

# GET /companies/:slug — public profile
echo "GET /companies/acme-corp"
curl -s $BASE_URL/companies/acme-corp | jq .

# PATCH /companies — update company
echo "PATCH /companies"
curl -s -X PATCH $BASE_URL/companies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $COMPANY_TOKEN" \
  -d '{
    "description": "We build cool stuff",
    "industry": "Technology",
    "website": "https://acme.com",
    "companySize": "10-50"
  }' | jq .

# POST /companies/:slug/invite — invite a member
echo "POST /companies/acme-corp/invite"
curl -s -X POST $BASE_URL/companies/acme-corp/invite \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $COMPANY_TOKEN" \
  -d '{"email": "member@acme.com"}' | jq .

# GET /companies/:slug/list-members
echo "GET /companies/acme-corp/list-members"
curl -s $BASE_URL/companies/acme-corp/list-members \
  -H "Authorization: Bearer $COMPANY_TOKEN" | jq .

# ============================================================
# POSTING ROUTES
# ============================================================

echo ""
echo "--- POSTING ROUTES ---"

# POST /postings — create posting
echo "POST /postings"
CREATE_POSTING=$(curl -s -X POST $BASE_URL/postings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $COMPANY_TOKEN" \
  -d '{
    "title": "Frontend Developer",
    "description": "Build our new dashboard",
    "shortDescription": "React frontend work",
    "postingType": "freelance",
    "workMode": "remote",
    "compensationType": "paid",
    "experienceLevel": "intermediate",
    "duration": "3 months",
    "budgetMin": 1000,
    "budgetMax": 3000,
    "currency": "CAD",
    "requiredSkills": ["React", "TypeScript"],
    "applicationDeadline": "2026-06-01"
  }')
echo $CREATE_POSTING | jq .
POSTING_ID=$(echo $CREATE_POSTING | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
echo "Posting ID: $POSTING_ID"

# GET /postings — browse all open postings (public)
echo "GET /postings"
curl -s $BASE_URL/postings | jq .

# PATCH /postings/:id/status — set to open
echo "PATCH /postings/$POSTING_ID/status"
curl -s -X PATCH $BASE_URL/postings/$POSTING_ID/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $COMPANY_TOKEN" \
  -d '{"status": "open"}' | jq .

# GET /postings/:id — view one posting
echo "GET /postings/$POSTING_ID"
curl -s $BASE_URL/postings/$POSTING_ID | jq .

# PATCH /postings/:id — edit posting
echo "PATCH /postings/$POSTING_ID"
curl -s -X PATCH $BASE_URL/postings/$POSTING_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $COMPANY_TOKEN" \
  -d '{"description": "Updated description"}' | jq .

# ============================================================
# STUDENT ROUTES
# ============================================================

echo ""
echo "--- STUDENT ROUTES ---"

# For student routes we need a student token
# In real testing you would use Microsoft OAuth
# Here we simulate by directly inserting a student in the DB
# and manually generating a token, or by using a test endpoint

# GET /students/:id — public profile (use a known student id)
# Replace STUDENT_ID with a real id from your DB
STUDENT_ID="replace_with_real_student_id"
echo "GET /students/$STUDENT_ID"
curl -s $BASE_URL/students/$STUDENT_ID | jq .

# ============================================================
# APPLICATION ROUTES
# ============================================================

echo ""
echo "--- APPLICATION ROUTES ---"

# These require a student token — see note above
# Replace STUDENT_TOKEN with a real token
STUDENT_TOKEN="replace_with_real_student_token"

# POST /postings/:id/apply
echo "POST /postings/$POSTING_ID/apply"
APPLICATION=$(curl -s -X POST $BASE_URL/postings/$POSTING_ID/apply \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $STUDENT_TOKEN" \
  -d '{
    "coverLetter": "I am very interested in this position",
    "proposedRate": 1500,
    "notes": "Available immediately"
  }')
echo $APPLICATION | jq .
APPLICATION_ID=$(echo $APPLICATION | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

# GET /applications/me — student views own applications
echo "GET /applications/me"
curl -s $BASE_URL/applications/me \
  -H "Authorization: Bearer $STUDENT_TOKEN" | jq .

# GET /postings/:id/applications — company views applicants
echo "GET /postings/$POSTING_ID/applications"
curl -s $BASE_URL/postings/$POSTING_ID/applications \
  -H "Authorization: Bearer $COMPANY_TOKEN" | jq .

# PATCH /applications/:id/status — company updates status
echo "PATCH /applications/$APPLICATION_ID/status"
curl -s -X PATCH $BASE_URL/applications/$APPLICATION_ID/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $COMPANY_TOKEN" \
  -d '{"status": "shortlisted"}' | jq .

# DELETE /applications/:id — student withdraws
echo "DELETE /applications/$APPLICATION_ID"
curl -s -X DELETE $BASE_URL/applications/$APPLICATION_ID \
  -H "Authorization: Bearer $STUDENT_TOKEN" | jq .

# ============================================================
# NOTIFICATION ROUTES
# ============================================================

echo ""
echo "--- NOTIFICATION ROUTES ---"

# GET /notifications
echo "GET /notifications"
NOTIFICATIONS=$(curl -s $BASE_URL/notifications \
  -H "Authorization: Bearer $COMPANY_TOKEN")
echo $NOTIFICATIONS | jq .
NOTIFICATION_ID=$(echo $NOTIFICATIONS | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

# PATCH /notifications/:id/read
echo "PATCH /notifications/$NOTIFICATION_ID/read"
curl -s -X PATCH $BASE_URL/notifications/$NOTIFICATION_ID/read \
  -H "Authorization: Bearer $COMPANY_TOKEN" | jq .

# PATCH /notifications/read-all
echo "PATCH /notifications/read-all"
curl -s -X PATCH $BASE_URL/notifications/read-all \
  -H "Authorization: Bearer $COMPANY_TOKEN" | jq .

# ============================================================
# ADMIN ROUTES
# ============================================================

echo ""
echo "--- ADMIN ROUTES ---"

# Replace ADMIN_TOKEN with a token from a platform_admin user
ADMIN_TOKEN="replace_with_real_admin_token"

# GET /admin/users
echo "GET /admin/users"
curl -s $BASE_URL/admin/users \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq .

# GET /admin/companies
echo "GET /admin/companies"
COMPANIES=$(curl -s $BASE_URL/admin/companies \
  -H "Authorization: Bearer $ADMIN_TOKEN")
echo $COMPANIES | jq .
COMPANY_ID=$(echo $COMPANIES | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

# PATCH /admin/companies/:id/verify
echo "PATCH /admin/companies/$COMPANY_ID/verify"
curl -s -X PATCH $BASE_URL/admin/companies/$COMPANY_ID/verify \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq .

# GET /admin/postings
echo "GET /admin/postings"
curl -s $BASE_URL/admin/postings \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq .

# PATCH /admin/users/:id/status
USER_ID="replace_with_real_user_id"
echo "PATCH /admin/users/$USER_ID/status"
curl -s -X PATCH $BASE_URL/admin/users/$USER_ID/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{"isActive": false}' | jq .

# GET /admin/audit-logs
echo "GET /admin/audit-logs"
curl -s $BASE_URL/admin/audit-logs \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq .

# ============================================================
# CLEANUP — delete the test posting
# ============================================================

echo ""
echo "--- CLEANUP ---"

echo "DELETE /postings/$POSTING_ID"
curl -s -X DELETE $BASE_URL/postings/$POSTING_ID \
  -H "Authorization: Bearer $COMPANY_TOKEN" | jq .

echo ""
echo "--- DONE ---"
