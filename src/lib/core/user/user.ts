import { ServerError, UserError } from "../../../error/error.class";
import { DocumentTime } from "../../../types";
import { CRUDEntityBuild, DataStored } from "../../../types/data";
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
		passwordSalt,
		passwordHash,
		isVerified = false,
		isBlocked = false,
		isAdmin = false,
		scope = [],
	}: User & { id?: string }): CRUDEntityBuild<
		DataStored<Omit<User, "password">>
	> {
		if (!name) throw new UserError("Name is required", 401);

		if (!Id().isValid(id)) throw new ServerError("Invalid id", 400);

		if (!birth) throw new UserError("Birthday is required", 401);

		if (name.length < 3)
			throw new UserError("Name must be more than 3 characters", 401);

		if (phone.length < 10) throw new UserError("Phone number invalid", 401);

		if (!email.includes("@")) throw new UserError("Email invalid", 401);

		if (checkPhoneNumber(phone))
			throw new UserError("Phone number invalid", 401);

		// Check if hash or salt exist, if not generate them with currently provided password
		if (!passwordHash || !passwordSalt) {
			if (checkPassword(password)) throw new Error("Password invalid");
			const { salt, hash: pwh } = generateSaltHash(password);
			passwordSalt = salt;
			passwordHash = pwh;
		}

		return Object.freeze({
			getId: () => sanitize(id),
			getEmail: () => sanitize(email),
			getName: () => sanitize(name),
			getBirth: () => birth,
			getPhone: () => sanitize(phone),
			getPasswordSalt: () => passwordSalt,
			getPasswordHash: () => passwordHash,
			getHash: () => makeHash(),
			getUpdatedAt: () => new Date(),
			getCreatedAt: () => new Date(),
			getIsAdmin: () => isAdmin,
			getIsVerified: () => isVerified,
			getIsBlocked: () => isBlocked,
			getScope: () => scope,
			markDeleted: () => {},
			isDeleted: () => false,
		});

		// only name and email is necessary
		function makeHash() {
			return hash(name + email);
		}
	};
}
