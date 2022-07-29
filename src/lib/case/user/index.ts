import { userDb } from "../../data-access";
import makeAddUser from "./add-user";
import makeGetUser from "./get-user";

export const addUser = makeAddUser({ dbDriver: userDb });
export const getUser = makeGetUser({ dbDriver: userDb });
