// crash if something is missing
const env = z.object({
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string().min(32),
    FRONTEND_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "production", "test"])
  }).parse(process.env);
  
export default env;