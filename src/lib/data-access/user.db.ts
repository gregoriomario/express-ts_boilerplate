import { User } from "@prisma/client";
import { DataStored, DbDriver } from "../../types/data";

export const userOperation = ({ dbDriver }: { dbDriver: DbDriver }) => {
	return Object.freeze({
		findAll,
		findOne,
		insert,
	});

	async function findAll() {
		const users = await dbDriver.user.findMany();
		return users;
	}
    
	async function findOne(id: string) {
		const user = await dbDriver.user.findUnique({
			where: {
				id,
			},
		});
		return user;
	}

	async function insert(userData: DataStored<User>) {
		const user = await dbDriver.user.create({
			data: userData,
		});
		return user;
	}
};
