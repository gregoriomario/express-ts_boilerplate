export class UserError extends Error {
	statusCode = 400;
	recommendation: string;
	constructor(message: string, statusCode?: number, recommendation?: string) {
		super(message);
		this.name = "UserError";
		this.statusCode = statusCode || 400;
		this.recommendation = recommendation || "";
		Object.setPrototypeOf(this, UserError.prototype);
	}
}

export class ServerError extends Error {
	statusCode = 500;
	constructor(message: string, statusCode?: number) {
		super(message);
		this.name = "ServerError";
		this.statusCode = statusCode || 500;
		Object.setPrototypeOf(this, UserError.prototype);
	}
}
