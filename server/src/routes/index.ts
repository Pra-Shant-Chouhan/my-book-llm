import type { Express, Request, Response } from "express";
import { artifactRoutes } from "./artifact.route.js";
import { sourceRoutes } from "./source.route.js";
import { workspaceRoutes } from "./workspace.route.js";

export function registerRoutes(app: Express) {
    workspaceRoutes.use("/:workspaceId/sources", sourceRoutes)
    workspaceRoutes.use("/:workspaceId/artifacts", artifactRoutes);
    app.use("/api/workspaces", workspaceRoutes);

    // app.get("/health", (req: Request, res: Response) => {
    //     res.status(200).json({ status: "ok" });
    // });
}