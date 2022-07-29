import { Request } from "express";
import { HTTPRequestType } from "../../types/http";
import { httpRequest } from "../constants";

export default function expressCb(
	controller: (hr: HTTPRequestType) => Promise<any>
) {
	return async (req: Request, res: any, next: any) => {
		try {
			const request = httpRequest(req);
			const result = await controller(request);
			const statusCode = (result.status as number) || 200;
			res.status(statusCode).json(result.data);
		} catch (error) {
			next(error);
		}
	};
}
