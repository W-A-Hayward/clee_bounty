// TODO: Complete app.ts implementation
// Steps needed:
// 1. Export handleRequest function that server.ts expects (should wrap app(request, response))
// 2. Ensure all middleware is properly configured
// 3. Add request logging middleware if needed
// 4. Add health check endpoint before routes
// 5. Verify errorHandler is properly typed

import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import corsOptions from "./config/cors.js";

export const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);
app.use(errorHandler); // always last

// TODO: Export handleRequest function for server.ts
// export function handleRequest(request: IncomingMessage, response: ServerResponse) {
//   app(request, response);
// }
