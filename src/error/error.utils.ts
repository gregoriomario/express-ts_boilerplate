import { ServerError } from "./error.class";

export const dbErrorHandler = (_: any) => {
	throw new ServerError("Database connection lost", 500);
};