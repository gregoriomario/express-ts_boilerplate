import { User } from "@prisma/client";
import { ServerError } from "../../error/error.class";
import { dbErrorHandler } from "../../error/error.utils";
import { DataStored, DbDriver } from "../../types/data";

export const userOperation = ({ dbDriver }: { dbDriver: DbDriver }) => {
	return Object.freeze({
		findAll,
		findOne,
		insert,
	});

	async function findAll() {
		const users = await dbDriver.user.findMany().catch(dbErrorHandler);
		return users;
	}

	async function findOne(id: string) {
		const user = await dbDriver.user
			.findUnique({
				where: {
					id,
				},
			})
			.catch(dbErrorHandler);
		return user;
	}

	async function insert(userData: DataStored<User>) {
		const user = await dbDriver.user
			.create({
				data: userData,
			})
			.catch(dbErrorHandler);
		return user;
	}
};
