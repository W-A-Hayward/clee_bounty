// TODO: Complete match.service.ts implementation
// Steps needed:
// 1. Import necessary dependencies (prisma client, error handling, notification utils, audit log)
// 2. Implement service functions:
//    - createMatch(projectId, studentUserId, companyDecisionBy) - create match from accepted application
//    - getMatch(matchId) - get match with project and student details
//    - getMatchesByProject(projectId) - list matches for a project
//    - getMatchesByStudent(studentUserId, filters) - list student's matches with project info
//    - updateMatchStatus(matchId, status) - update match status (active, completed, cancelled)
//    - completeMatch(matchId) - mark match as completed, update project status
// 3. Update project status when match is created (set to 'matched')
// 4. Create notifications when match is created or status changes
// 5. Handle business logic (can't create duplicate matches, etc.)
// 6. Handle errors appropriately
// 7. Export all service functions
