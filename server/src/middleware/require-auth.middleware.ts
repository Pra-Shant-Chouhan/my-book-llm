

import type { NextFunction, Request, Response } from "express";
import type { Session } from "../lib/session.js";
import { auth } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";
// declare module "express-serve-static-core" {
//     interface Request {
//         session: Session;
//     }
// }
// Fix the above  "express-serve-static-core" not found error by adding the following code to the top of the file
declare global {
    namespace Express {
        interface Request {
            session?: Session;
        }
    }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers as Record<string, string>),
    });
    if (!session?.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    req.session = session as Session;
    next();
}
