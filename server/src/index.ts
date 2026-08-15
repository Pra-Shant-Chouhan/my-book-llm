import { toNodeHandler } from "better-auth/node";
import express from "express";
import { auth } from "./lib/auth.js";
const app = express();
const PORT = process.env.PORT || 8080;
import cors from "cors";
import { registerRoutes } from "./routes/index.js";
import { errorHandler } from "./middleware/error-handler.middleware.js";
import { inngest } from "./inngest/client.js";
import { functions } from "./inngest/index.js";
import { serve } from "inngest/express";

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:3001", // 3000(hosted) || 3001
        credentials: true,
    }) 
);

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/health", (req, res) => {
    res.send("Health check passed!");
});
registerRoutes(app);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})