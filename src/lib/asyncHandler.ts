import { NextFunction, RequestHandler, Request, Response } from "express";

export const aysncHandler =
	(fn: RequestHandler<{}, any, any, any, Record<string, any>>) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await Promise.resolve(fn(req, res, next));
		} catch (error) {
			if (typeof error == "string") {
				return next(new Error(error));
			}
			next(error);
		}
	};
