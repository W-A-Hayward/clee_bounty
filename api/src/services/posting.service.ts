// TODO: Complete project.service.ts implementation
// Steps needed:
// 1. Import necessary dependencies (prisma client, slug utils, error handling, audit log)
// 2. Implement service functions:
//    - createProject(companyId, createdBy, data) - create project with unique slug
//    - getProject(projectIdOrSlug) - get project with company, applications, matches
//    - getProjects(filters, pagination) - list projects with filters (status, visibility, company, etc.)
//    - updateProject(projectId, data, userId) - update project details (verify ownership)
//    - updateProjectStatus(projectId, status, userId) - update project status
//    - deleteProject(projectId, userId) - delete project (verify ownership, check for matches)
//    - publishProject(projectId, userId) - publish draft project (set publishedAt, status to open)
// 3. Generate unique slugs for projects
// 4. Handle visibility logic (public, private, invite_only)
// 5. Create audit logs for project changes
// 6. Handle errors appropriately
// 7. Export all service functions
