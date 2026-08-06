import { toNodeHandler } from "better-auth/node";
import express from "express";
import { auth } from "./lib/auth.js";
const app = express();
const PORT = process.env.PORT || 8080;
import cors from "cors";
// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})