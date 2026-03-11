// TODO: Complete review.validators.ts implementation
// Steps needed:
// 1. Import express-validator or zod for validation
// 2. Create validation rules for:
//    - createReview: projectId, revieweeId, rating (1-5), comment (optional)
//    - updateReview: rating (optional), comment (optional)
// 3. Validate projectId exists and is valid
// 4. Validate revieweeId exists and is valid
// 5. Validate rating is integer between 1 and 5
// 6. Validate comment length if provided (max length)
// 7. Export validation chains/arrays for each endpoint
