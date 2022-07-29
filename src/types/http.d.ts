export type HTTPResponseType = {
	headers: {
		[key: string]: string;
	};
	status?: number;
	data?: any;
	error?: any;
    success?: boolean;
};
