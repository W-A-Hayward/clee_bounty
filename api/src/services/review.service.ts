// TODO: Complete review.service.ts implementation
// Steps needed:
// 1. Import necessary dependencies (prisma client, error handling)
// 2. Implement service functions:
//    - createReview(projectId, reviewerId, revieweeId, rating, comment) - create review
//    - getReview(reviewId) - get review with reviewer and reviewee info
//    - getReviewsByProject(projectId) - list reviews for a project
//    - getReviewsByUser(userId) - list reviews received by a user
//    - updateReview(reviewId, reviewerId, data) - update review (only by reviewer, within time limit)
//    - deleteReview(reviewId, userId, isAdmin) - delete review (only by reviewer or admin)
// 3. Validate that project is completed before allowing reviews
// 4. Ensure users can only review once per project
// 5. Validate rating (1-5)
// 6. Handle errors appropriately
// 7. Export all service functions
