import { Request } from "express";
import { HTTPRequestType } from "../../../types/http";
import { getUser } from "../../case";
import { httpReponse } from "../../constants";

export default function makeGetUser({ gu }: { gu: typeof getUser }) {
	return async function (httpRequest: HTTPRequestType) {
		const users = await getUser();
		return httpReponse({
			data: users,
			message: "Successfully retrieved users",
			headers: {
				"Content-Type": "application/json",
			},
		});
	};
}
