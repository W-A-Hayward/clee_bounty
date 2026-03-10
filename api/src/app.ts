import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import corsOptions from "./config/cors.js";

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);
app.use(errorHandler); // always last

export default app;