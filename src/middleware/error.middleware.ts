import { Response, Request, NextFunction } from "express";
import { UserError } from "../error/error.class";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
	const error = new UserError(`Not found - ${req.originalUrl}`, 404);
	next(error);
};

export const errorHandler = (
	err: Error | UserError,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	const error: Record<string, any> = {
		name: err.name || "Internal Server Error",
		message: err.message || "Something went wrong",
		status: res.statusCode || 500,
	};

	if (err instanceof UserError) {
		error.status = err.statusCode;
		if (err.recommendation) {
			error.recommendation = err.recommendation;
		}
	}
	res.status(error.status).json({ error });
};
