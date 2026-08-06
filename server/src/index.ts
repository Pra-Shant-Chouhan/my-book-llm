import { toNodeHandler } from "better-auth/node";
import express from "express";
import { auth } from "./lib/auth.js";
const app = express();
const PORT = process.env.PORT || 8080;
import cors from "cors";
import { registerRoutes } from "./routes/index.js";
import { errorHandler } from "./middleware/error-handler.middleware.js";

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:3001", // 3000(hosted) || 3001
        credentials: true,
    }) 
);

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get("/health", (req, res) => {
    res.send("Health check passed!");
});
registerRoutes(app);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})