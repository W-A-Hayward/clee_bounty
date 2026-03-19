// TODO: Complete cors.ts configuration
// Steps needed:
// 1. Import corsOptions type from express/cors
// 2. Import env configuration to get allowed origins
// 3. Configure CORS options:
//    - Set origin based on env.corsOrigin (support both '*' and array of strings)
//    - Configure credentials (allow cookies/auth headers)
//    - Set allowed methods (GET, POST, PUT, DELETE, PATCH, OPTIONS)
//    - Set allowed headers (Content-Type, Authorization, etc.)
//    - Configure preflight options
// 4. Export default corsOptions

import cors, { type CorsOptions } from "cors"; // Import the type
import { env } from "./env.ts";

const corsOptions: CorsOptions = {
  origin: env.FRONTEND_URL,
  credentials: true, // needed for cookies to work cross-origin
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;

