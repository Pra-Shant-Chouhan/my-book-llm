import type { Express, Request, Response } from "express";
import { sourceRoutes } from "./source.route.js";
import { workspaceRoutes } from "./workspace.route.js";

export function registerRoutes(app: Express) {
    workspaceRoutes.use("/:workspaceId/sources", sourceRoutes)
    app.use("/api/workspaces", workspaceRoutes);

    // app.get("/health", (req: Request, res: Response) => {
    //     res.status(200).json({ status: "ok" });
    // });
}