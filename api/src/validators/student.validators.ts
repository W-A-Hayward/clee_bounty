// TODO: Complete student.validators.ts implementation
// Steps needed:
// 1. Import express-validator or zod for validation
// 2. Create validation rules for:
//    - updateStudentProfile: schoolName, programName, graduationYear, bio, location, skillsSummary, portfolioUrl, linkedinUrl, githubUrl, resumeUrl, availability, hourlyRate
//    - updatePortfolio: portfolioUrl
// 3. Validate URLs (portfolioUrl, linkedinUrl, githubUrl, resumeUrl) are valid URLs if provided
// 4. Validate graduationYear is valid year (if provided)
// 5. Validate hourlyRate is positive number if provided
// 6. Validate bio and skillsSummary length if provided
// 7. Sanitize inputs
// 8. Export validation chains/arrays for each endpoint
