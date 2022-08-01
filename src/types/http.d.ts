import { httpRequest } from "../lib/constants";

export type HTTPRequestType = ReturnType<typeof httpRequest>;
export type HTTPResponseType = {
	headers: {
		[key: string]: string;
	};
	message?: string;
	status?: number;
	data?: any;
	error?: any;
	success?: boolean;
};
