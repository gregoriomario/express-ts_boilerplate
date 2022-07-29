import express from "express";
import { basicResponse } from "../constants/response";

export const router = express.Router();

router.get("/", (req, res) => {
	res.json({ ...basicResponse, message: "Welcome to the API" });
});

router.get("/users", (req, res) => {
	res.json({
		...basicResponse,
		message: "Getting all users",
		name: "Welcome to the API",
	});
});
