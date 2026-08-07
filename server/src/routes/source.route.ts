import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import { createSource, listSources } from "../controllers/source.controller.js";
import { bulkDeleteSourcesSchema } from "../validators/source.validator.js";

export const sourceRoutes = Router({mergeParams:true});

sourceRoutes.get("/", asyncHandler(listSources));
sourceRoutes.post("/", asyncHandler(createSource));
// sourceRoutes.post("/bulk-delete", asyncHandler(bulkDeleteSourcesSchema));
// sourceRoutes.get("/:sourceId", asyncHandler(getSource));
// // sourceRoutes.delete("/:sourceId", asyncHandler(deleteSource));