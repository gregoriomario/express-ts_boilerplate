import { User } from "../../../types/user";
import { buildUser } from "../../core/user";
import { userDb } from "../../data-access";

export default function addUser({ dbDriver }: { dbDriver: typeof userDb }) {
	return async function createUser(user: User) {
		const newUser = buildUser(user);
		return dbDriver.insert({
			id: newUser.getId() as string,
			name: newUser.getName() as string,
			birth: newUser.getBirth() as Date,
			phone: newUser.getPhone() as string,
			email: newUser.getEmail() as string,
			passwordSalt: newUser.getPasswordSalt() as string,
			passwordHash: newUser.getPasswordSalt() as string,
			isVerified: newUser.getIsVerified() as boolean,
			isBlocked: newUser.getIsBlocked() as boolean,
			isAdmin: newUser.getIsAdmin() as boolean,
			scope: newUser.getScope() as string[],
			isDeleted: newUser.isDeleted(),
			createdAt: newUser.getCreatedAt() as Date,
			updatedAt: newUser.getUpdatedAt() as Date,
			hash: newUser.getHash() as string,
		});
	};
}
