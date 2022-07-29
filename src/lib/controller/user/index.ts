import { getUser } from "../../case";
import makeGetUser from "./get-user";

export const getUsers = makeGetUser({ gu: getUser });
