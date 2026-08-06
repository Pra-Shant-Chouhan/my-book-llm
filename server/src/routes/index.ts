import type {Express, Request, Response} from "express";
import { workspaceRoutes } from "./workspace.route";

export function registerRoutes(app: Express) {
    app.use("/api/workspaces",workspaceRoutes);
    
    app.get("/health", (req: Request, res: Response) => {
        res.status(200).json({ status: "ok" });
    });
}