// TODO: Complete application.validators.ts implementation
// Steps needed:
// 1. Import express-validator or zod for validation
// 2. Create validation rules for:
//    - createApplication: projectId, coverLetter, proposedRate (optional)
//    - updateApplicationStatus: status (enum: submitted, shortlisted, interviewing, accepted, rejected, withdrawn)
// 3. Validate projectId exists and is valid
// 4. Validate coverLetter length (min/max)
// 5. Validate proposedRate is positive number if provided
// 6. Validate status is valid enum value
// 7. Export validation chains/arrays for each endpoint
