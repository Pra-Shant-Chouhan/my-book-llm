import type { Request, Response } from "express";
import { getUserId } from "../lib/getUserId.js";
import {
    createArtifactForWorkspace,
    deleteArtifactForWorkspace,
    getArtifactForWorkspace,
    listArtifactsForWorkspace,
} from "../services/artifact.service.js";
import { ValidationError } from "../types/app-error.js";
import { getZodFieldErrors } from "../utils/zod-error.js";
import {
    artifactIdParamSchema,
    createArtifactSchema,
} from "../validators/artifact.validator.js";
import { workspaceIdParamSchema } from "../validators/workspace.validator.js";

function validate<T>(schema: { safeParse: (data: unknown) => { success: true; data: T } | { success: false; error: Parameters<typeof getZodFieldErrors>[0] } }, data: unknown, message: string) {
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
        throw new ValidationError(message, getZodFieldErrors(parsed.error));
    }

    return parsed.data;
}

export async function listArtifacts(req: Request, res: Response) {
    const { workspaceId } = validate(
        workspaceIdParamSchema,
        req.params,
        "Invalid workspace id",
    );

    const artifacts = await listArtifactsForWorkspace(
        workspaceId,
        getUserId(req),
    );

    return res.status(200).json(artifacts);
}

export async function getArtifact(req: Request, res: Response) {
    const { workspaceId, artifactId } = validate(
        artifactIdParamSchema,
        req.params,
        "Invalid artifact id",
    );

    const artifact = await getArtifactForWorkspace(
        workspaceId,
        artifactId,
        getUserId(req),
    );

    return res.status(200).json(artifact);
}

export async function createArtifact(req: Request, res: Response) {
    const { workspaceId } = validate(
        workspaceIdParamSchema,
        req.params,
        "Invalid workspace id",
    );
    const input = validate(createArtifactSchema, req.body, "Validation failed");

    const artifact = await createArtifactForWorkspace(
        workspaceId,
        getUserId(req),
        input,
    );

    return res.status(201).json(artifact);
}

export async function deleteArtifact(req: Request, res: Response) {
    const { workspaceId, artifactId } = validate(
        artifactIdParamSchema,
        req.params,
        "Invalid artifact id",
    );

    await deleteArtifactForWorkspace(
        workspaceId,
        artifactId,
        getUserId(req),
    );

    return res.sendStatus(204);
}