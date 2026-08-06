import type {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express";



type AsyncRequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
) => void | Promise<unknown>;


export function asyncHandler(handler: AsyncRequestHandler): RequestHandler {
    return (req, res, next) => {
        Promise.resolve()
            .then(() => handler(req, res, next))
            .catch(next);
    };
}
