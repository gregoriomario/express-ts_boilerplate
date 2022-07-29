import { ServerError, UserError } from "../../../error/error.class";
import { DocumentTime } from "../../../types";
import { User } from "../../../types/user";
import { makeId } from "../../../utils/id";
import { generateSaltHash } from "../../../utils/password";
import { checkPassword, checkPhoneNumber } from "../../../utils/regex";

type BlockUserProps = {
	Id: typeof makeId;
	hash: (text: string) => string;
	sanitize: (text: string) => string;
};

export default function blockUser({ Id, hash, sanitize }: BlockUserProps) {
	return function makeUser({
		id = Id().id,
		name,
		birth,
		phone,
		email,
		password,
		isVerified = false,
		isBlocked = false,
		isAdmin = false,
		scope = [],
		isDeleted = false,
	}: Omit<User, DocumentTime>) {
		if (!name) throw new UserError("Name is required", 401);

		if (!Id().isValid(id)) throw new ServerError("Invalid id", 400);

		if (!birth) throw new UserError("Birthday is required", 401);

		if (name.length < 3)
			throw new UserError("Name must be more than 3 characters", 401);

		if (phone.length < 10) throw new UserError("Phone number invalid", 401);

		if (!email.includes("@")) throw new UserError("Email invalid", 401);

		if (checkPhoneNumber(phone))
			throw new UserError("Phone number invalid", 401);

		if (checkPassword(password)) throw new Error("Password invalid");

		const { salt, hash: passwordHash } = generateSaltHash(password);

		return Object.freeze({
			getId: () => id,
			getEmail: () => email,
			getName: () => name,
			getBirth: () => birth,
			getPhone: () => phone,
			getPasswordSalt: () => salt,
			getPasswordHash: () => passwordHash,
			getHash: () => makeHash(),
			getUpdatedAt: () => new Date(),
			getCreatedAt: () => new Date(),
			isDeleted: () => isDeleted,
			isAdmin: () => isAdmin,
			isVerified: () => isVerified,
			isBlocked: () => isBlocked,
			getScope: () => scope,
		});

		// only name and email is necessary
		function makeHash() {
			return hash(name + email);
		}
	};
}
