// TODO: Complete student.service.ts implementation
// Steps needed:
// 1. Import necessary dependencies (prisma client, error handling, file storage)
// 2. Implement service functions:
//    - getStudentProfile(userId) - get student profile with user info
//    - updateStudentProfile(userId, data) - update student profile (verify ownership)
//    - getStudentApplications(userId, filters) - get student's applications with project info
//    - getStudentMatches(userId, filters) - get student's matches with project info
//    - getStudentProjects(userId, filters) - get student's completed projects
//    - uploadResume(userId, file) - upload resume file, update profile
//    - updatePortfolio(userId, portfolioUrl) - update portfolio URL
// 3. Handle file uploads for resume
// 4. Validate profile data (URLs, availability, rate, etc.)
// 5. Ensure students can only update their own profile
// 6. Handle errors appropriately
// 7. Export all service functions
