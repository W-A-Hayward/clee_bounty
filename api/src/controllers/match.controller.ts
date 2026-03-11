// TODO: Complete match.controller.ts implementation
// Steps needed:
// 1. Import necessary dependencies (Request, Response, match service, auth middleware, ownership middleware)
// 2. Implement controller functions:
//    - createMatch(req, res, next) - create match from accepted application (company only)
//    - getMatch(req, res, next) - get match details
//    - getMatchesByProject(req, res, next) - list matches for a project
//    - getMatchesByStudent(req, res, next) - list student's matches
//    - updateMatchStatus(req, res, next) - update match status (active, completed, cancelled)
//    - completeMatch(req, res, next) - mark match as completed
// 3. Ensure proper authorization (companies create matches, both can view their matches)
// 4. Handle errors and return appropriate HTTP responses
// 5. Export all controller functions
