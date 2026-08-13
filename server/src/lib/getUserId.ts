import { type Request } from "express";
import { UnauthorizedError } from "../types/app-error.js";

// auth.ts
export function getUserId(req: Request): string {
    const userId = req.session?.user?.id;

    if (!userId) {
        throw new UnauthorizedError("Unauthorized");
    }

    return userId;
}