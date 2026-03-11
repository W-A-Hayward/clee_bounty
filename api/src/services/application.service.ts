// TODO: Complete application.service.ts implementation
// Steps needed:
// 1. Import necessary dependencies (prisma client, error handling, notification utils, audit log)
// 2. Implement service functions:
//    - createApplication(studentUserId, projectId, data) - create application, check for duplicates
//    - getApplication(applicationId) - get application with project and student details
//    - getApplicationsByProject(projectId, filters) - list applications for project with student info
//    - getApplicationsByStudent(studentUserId, filters) - list student's applications with project info
//    - updateApplicationStatus(applicationId, status, updatedBy) - update status, create notifications
//    - withdrawApplication(applicationId, studentUserId) - mark as withdrawn
// 3. Create notifications when application status changes
// 4. Handle business logic (can't apply twice, can't apply to closed projects, etc.)
// 5. Handle errors appropriately
// 6. Export all service functions
