import { Request } from "express";
import { HTTPResponseType } from "../../types/http";
export const basicResponse = {
	success: true,
	message: " ",
	statusCode: 200,
	data: {},
};

export const httpRequest = (req: Request) => {
	return {
		body: req.body,
		query: req.query,
		params: req.params,
		ip: req.ip,
		method: req.method,
		path: req.path,
		headers: {
			"Content-Type": req.get("Content-Type") ?? "",
			Referer: req.get("referer") ?? "",
			"User-Agent": req.get("User-Agent") ?? "",
		},
	};
};

export const httpReponse = (
	overrides: HTTPResponseType,
	error?: unknown
): HTTPResponseType => {
	if (error) {
		if (error instanceof Error) {
			return {
				headers: {
					"Content-Type": "application/json",
				},
				status: 500,
				error: {
					message: error.message,
				},
			};
		} else {
			return {
				headers: {
					"Content-Type": "application/json",
				},
				status: 500,
				error: {
					message: JSON.stringify(error),
				},
			};
		}
	}

	const basicResponse: HTTPResponseType = {
		data: {},
		success: true,
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	};

	return {
		...basicResponse,
		...overrides,
	};
};
