import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import {
    createArtifact,
    deleteArtifact,
    getArtifact,
    listArtifacts,
} from "../controllers/artifact.controller.js";

export const artifactRoutes = Router({ mergeParams: true });

artifactRoutes.get("/", asyncHandler(listArtifacts));
artifactRoutes.post("/", asyncHandler(createArtifact));
artifactRoutes.get("/:artifactId", asyncHandler(getArtifact));
artifactRoutes.delete("/:artifactId", asyncHandler(deleteArtifact));