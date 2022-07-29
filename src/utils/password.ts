import crypto from "crypto";

/**
 * Good practice for saving passwords is use salt and hash it with the salt
 *
 * @param password - password to hash
 * @returns Object { salt : random 32 bytes, hash : 64 byte hash of password }
 *
 */
export const generateSaltHash = (password: string) => {
	const salt = crypto.randomBytes(32).toString("hex");
	const hash = crypto
		.pbkdf2Sync(password, salt, 1000, 64, "sha512")
		.toString("hex");
	return Object.freeze({ salt, hash });
};

/**
 * Verify the input password using salt and hash from user database
 *
 * @param password - password to hash
 * @param salt
 * @param hash
 * @returns true if password is correct, false otherwise
 */
export const verifyPassword = (
	password: string,
	salt: string,
	hash: string
) => {
	const verify = crypto
		.pbkdf2Sync(password, salt, 1000, 64, "sha512")
		.toString("hex");
	return verify === hash;
};
