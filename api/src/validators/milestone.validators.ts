// TODO: Complete milestone.validators.ts implementation
// Steps needed:
// 1. Import express-validator or zod for validation
// 2. Create validation rules for:
//    - createMilestone: projectId, title, description (optional), dueDate (optional), amount (optional), status
//    - updateMilestone: same fields as create (all optional except projectId)
//    - updateMilestoneStatus: status (enum: pending, in_progress, submitted, approved, revision_requested, paid)
// 3. Validate projectId exists and is valid
// 4. Validate title is not empty
// 5. Validate dueDate is valid date and in the future (if provided)
// 6. Validate amount is positive number if provided
// 7. Validate status is valid enum value
// 8. Export validation chains/arrays for each endpoint
