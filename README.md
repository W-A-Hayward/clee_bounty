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

- [x] `GET /postings` — browse all open postings (public)
- [x] `GET /postings/:slug` — view one posting (public)
- [x] `POST /postings` — create posting (company only)
- [x] `PATCH /postings/:id` — edit posting (company only)
- [x] `PATCH /postings/:id/status` — open, close, archive
- [x] `DELETE /postings/:id` — delete posting
- [x] `POST /postings/:id/apply` — student applies (CV + cover letter)
- [x] `GET /postings/:id/applications` — company views applicants

**5. Application routes**

- [x] `GET /applications/me` — student views own applications
- [x] `PATCH /applications/:id/status` — company updates status
- [x] `DELETE /applications/:id` — student withdraws

**6. Notification routes**

- [x] `GET /notifications` — get all for current user
- [x] `PATCH /notifications/:id/read` — mark one read
- [x] `PATCH /notifications/read-all` — mark all read

**7. Admin routes**

- `GET /admin/users`
- `PATCH /admin/users/:id/status`
- `GET /admin/companies`
- `PATCH /admin/companies/:id/verify`
- `GET /admin/postings`
- `GET /admin/audit-logs`
