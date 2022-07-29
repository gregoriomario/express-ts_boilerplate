import jwt from "jsonwebtoken";
import { PRIV_KEY, PUB_KEY } from "../config/env.config";

/**
 * @typedef {object} JWT
 * @property {String} token - JWT token
 * @property {String} expiresIn - How long it will be valid
 */

/**
 * Issuing JWT for several purpose (signing, verifying, etc.)
 *
 * @param payload - object data to encode in JWT
 * @returns {JWT} jwt object
 */
export const issueJWT = (payload: Record<string, any>, expiresIn: "7d") => {
	payload.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
	payload.iat = Math.floor(Date.now() / 1000);

	const signedInToken = jwt.sign(payload, PRIV_KEY, {
		expiresIn,
		algorithm: "RS256",
	});

	return { token: "Bearer " + signedInToken, expiresIn };
};

/**
 * Self explanatory
 *
 * @param token JWT Token
 * @returns string or payload of JWT
 */
export const verifyJWT = (token: string) => {
	if (token.startsWith("Bearer ")) {
		token = token.split(" ")[1];
	}
	return jwt.verify(token, PUB_KEY, { algorithms: ["RS256"] });
};
