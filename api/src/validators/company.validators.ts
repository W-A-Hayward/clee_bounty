// TODO: Complete company.validators.ts implementation
// Steps needed:
// 1. Import express-validator or zod for validation
// 2. Create validation rules for:
//    - createCompany: name, slug (auto-generated or provided), logoUrl, website, industry, companySize, description
//    - updateCompany: same fields as create (all optional)
//    - addCompanyMember: userId, memberRole (enum: admin, member)
// 3. Validate name is not empty
// 4. Validate slug format (URL-friendly)
// 5. Validate URLs (logoUrl, website)
// 6. Validate memberRole is valid enum value
// 7. Export validation chains/arrays for each endpoint
