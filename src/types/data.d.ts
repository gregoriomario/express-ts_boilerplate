import { prisma } from "../lib/data-access";

type DbDriver = typeof prisma;

type DataStoredProperty = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	hash: string;
};

type DataStored<T> = T & DataStoredProperty;
type DeleteOperation = {
    markDeleted: () => void;
    isDeleted: () => boolean;
}


export type EntityBuild<T> = {
	[Key in keyof T as `get${Capitalize<keyof T>}`]: () => T[Key];
};

export type CRUDEntityBuild<T> = EntityBuild<T> & DeleteOperation;
