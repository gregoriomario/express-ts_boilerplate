import { v4, validate } from "uuid";

type Id = {
	id: string;
	isValid: (id: string) => boolean;
};

export const makeId = (): Id => {
	const id = v4();
	return {
		id,
		isValid: validate,
	};
};
