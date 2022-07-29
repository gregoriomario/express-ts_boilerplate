import { userDb } from "../../data-access";

export default function findUser({ dbDriver }: { dbDriver: typeof userDb }) {
	return async function findAllUser() {
		return dbDriver.findAll();
	};
}
