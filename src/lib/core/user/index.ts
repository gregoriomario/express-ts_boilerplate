import blockUser from "./user";
import { makeId as Id } from "../../../utils/id";
import { md5 as hash } from "../../../utils/hash";

// TODO: Lib to sanitize data
function sanitize() {
	return "";
}

export const buildUser = blockUser({ Id, hash, sanitize });
