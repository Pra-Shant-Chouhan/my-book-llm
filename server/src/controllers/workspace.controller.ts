import type { Request, Response } from "express";
import {
    createWorkspaceForUser,
    deleteWorkspaceForUser,
    getWorkspaceByIdForUser,
    listWorkspacesByUser,
    updateWorkspaceForUser,
} from "../services/workspace.service.js";
import { UnauthorizedError, ValidationError } from "../types/app-error.js";
import { getZodFieldErrors } from "../utils/zod-error.js";
import {
    createWorkspaceSchema,
    updateWorkspaceSchema,
    workspaceIdParamSchema,
} from "../validators/workspace.validator.js";
import type { ZodSchema } from "zod";

function validate<T>(schema: ZodSchema<T>, data: unknown, message = "Validation failed"): T {
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
        throw new ValidationError(
            message,
            getZodFieldErrors(parsed.error),
        );
    }

    return parsed.data;
}

function getUserId(req: Request): string {
    const userId = req.session?.user?.id;

    if (!userId) {
        throw new UnauthorizedError("Unauthorized");
    }

    return userId;
}

export async function listWorkspaces(req: Request, res: Response) {
    const userId = getUserId(req);

    const workspaces = await listWorkspacesByUser(userId);

    return res.status(200).json(workspaces);
}

export async function getWorkspace(req: Request, res: Response) {
    const userId = getUserId(req);

    const { workspaceId } = validate(
        workspaceIdParamSchema,
        req.params,
        "Invalid workspace id",
    );

    const workspace = await getWorkspaceByIdForUser(
        workspaceId,
        userId,
    );

    return res.status(200).json(workspace);
}

export async function createWorkspace(req: Request, res: Response) {
    const userId = getUserId(req);

    const input = validate(createWorkspaceSchema, req.body);

    const workspace = await createWorkspaceForUser(
        userId,
        input,
    );

    return res.status(201).json(workspace);
}

export async function updateWorkspace(req: Request, res: Response) {
    const userId = getUserId(req);

    const { workspaceId } = validate(
        workspaceIdParamSchema,
        req.params,
        "Invalid workspace id",
    );

    const input = validate(updateWorkspaceSchema, req.body);

    const workspace = await updateWorkspaceForUser(
        workspaceId,
        userId,
        input,
    );

    return res.status(200).json(workspace);
}

export async function deleteWorkspace(req: Request, res: Response) {
    const userId = getUserId(req);

    const { workspaceId } = validate(
        workspaceIdParamSchema,
        req.params,
        "Invalid workspace id",
    );

    await deleteWorkspaceForUser(workspaceId, userId);

    return res.sendStatus(204);
}