### Done

- ✅ `app.ts` and `server.ts`
- ✅ `config/env.ts`, `config/cors.ts`
- ✅ `lib/prisma.ts`
- ✅ `middleware/auth.middleware.ts`, `validate.middleware.ts`, `errorHandler.ts`
- ✅ `utils/jwt.ts`, `utils/slug.ts`, `utils/asyncHandler.ts`
- ✅ Auth routes (company register, login, logout, me, refresh, Microsoft OAuth)
- ✅ Prisma schema + migration

---

### Next — in order

**1. Finish utils**

- [x] `utils/auditLog.ts`
- [x] `utils/notification.ts`

**2. Student routes**

- `GET /students/me` — get own profile
- `PATCH /students/me` — update profile
- `POST /students/me/resume` — upload CV (multer)
- `GET /students/:id` — public profile

**3. Company routes**

- [x] `POST /companies` — create company (accomplished when creating user)
- [x] `GET /companies/:slug` — public profile
- [x] `PATCH /companies/:id` — update company
- [x] `POST /companies/:id/invite` — invite member
- [x] `GET /companies/:id/members` — list members

**4. Posting routes**

- `GET /postings` — browse all open postings (public)
- `GET /postings/:slug` — view one posting (public)
- `POST /postings` — create posting (company only)
- `PATCH /postings/:id` — edit posting (company only)
- `PATCH /postings/:id/status` — open, close, archive
- `DELETE /postings/:id` — delete posting

**5. Application routes**

- `POST /postings/:id/apply` — student applies (CV + cover letter)
- `GET /postings/:id/applications` — company views applicants
- `GET /applications/me` — student views own applications
- `PATCH /applications/:id/status` — company updates status
- `DELETE /applications/:id` — student withdraws

**6. Notification routes**

- `GET /notifications` — get all for current user
- `PATCH /notifications/:id/read` — mark one read
- `PATCH /notifications/read-all` — mark all read

**7. Admin routes**

- `GET /admin/users`
- `PATCH /admin/users/:id/status`
- `GET /admin/companies`
- `PATCH /admin/companies/:id/verify`
- `GET /admin/postings`
- `GET /admin/audit-logs`
