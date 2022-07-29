import blockUser from "./user";
import { makeId as Id } from "../../../utils/id";
import { md5 as hash } from "../../../utils/hash";
import xss from "xss";

export const buildUser = blockUser({ Id, hash: hash, sanitize: xss });
