import { Request, Response } from "express";
import { HTTPRequestType, HTTPResponseType } from "../../types/http";
import { httpRequest } from "../constants";

export default function expressCb(
	controller: (hr: HTTPRequestType) => Promise<HTTPResponseType>
) {
	return async (req: Request, res: Response, next: any) => {
		try {
			const request = httpRequest(req);
			const { headers, ...other } = await controller(request);
			const statusCode = (other.status as number) || 200;
			res.header(headers);
			return res.status(statusCode).json(other);
		} catch (error) {
			next(error);
		}
	};
}
