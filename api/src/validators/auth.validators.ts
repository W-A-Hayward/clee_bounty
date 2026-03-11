// TODO: Complete auth.validators.ts implementation
// Steps needed:
// 1. Import express-validator or zod for validation
// 2. Create validation rules for:
//    - registerStudent: name, email, password, school, program, portfolioUrl, availability, rate
//    - registerCompany: name, email, password, companyName, website, industry, location, teamSize, description
//    - login: email, password
//    - refreshToken: token
// 3. Validate email format
// 4. Validate password strength (min length, complexity if needed)
// 5. Validate URLs (portfolioUrl, website)
// 6. Sanitize inputs
// 7. Export validation chains/arrays for each endpoint