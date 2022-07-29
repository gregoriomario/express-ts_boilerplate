export type User = {
	name: string;
	birth: Date;
	phone: string;
	email: string;
	password: string;
	passwordSalt: string;
	passwordHash: string;
	isVerified: boolean;
	isBlocked: boolean;
	isAdmin: boolean;
	scope: string[];
	hash: string;
};
