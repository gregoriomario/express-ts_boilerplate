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
