export type User = {
	id: string;
	name: string;
	birth: Date;
	phone: string;
	email: string;
	password: string;
	hash: string;
	salt: string;
	isVerified: boolean;
	isBlocked: boolean;
	isAdmin: boolean;
	scope: string[];
	isDeleted: boolean;
	createdAt: Date;
	updatedAt: Date;
};
