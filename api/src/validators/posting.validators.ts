// TODO: Complete project.validators.ts implementation
// Steps needed:
// 1. Import express-validator or zod for validation
// 2. Create validation rules for:
//    - createProject: companyId, title, shortDescription, description, projectType, workMode, duration, compensationType, budgetMin, budgetMax, currency, requiredSkills (array), experienceLevel, applicationDeadline, visibility
//    - updateProject: same fields as create (all optional)
//    - updateProjectStatus: status (enum: draft, open, in_review, matched, in_progress, completed, cancelled, archived)
// 3. Validate title is not empty
// 4. Validate projectType, workMode, compensationType, experienceLevel, visibility are valid enum values
// 5. Validate budgetMin <= budgetMax if both provided
// 6. Validate requiredSkills is array of strings
// 7. Validate applicationDeadline is valid date and in the future
// 8. Validate currency is valid currency code if provided
// 9. Export validation chains/arrays for each endpoint
