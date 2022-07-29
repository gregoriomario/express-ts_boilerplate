import express, {
	Response,
	Request,
	NextFunction,
	Application,
	RequestHandler,
} from "express";
import { router } from "./routes";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import { NODE_ENV, PORT } from "./config/env.config";
import helmet from "helmet";
import { errorHandler, notFound } from "./middleware/error.middleware";
import { UserError } from "./error/error.class";
import { aysncHandler } from "./lib/asyncHandler";
const app = express();
app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(NODE_ENV == "production" ? morgan("combined") : morgan("dev"));
app.use(express.raw());

app.get("/", (req, res) => {
	res.status(200).json({ success: true });
});

app.get(
	"/error",
	aysncHandler(async (req, res, next) => {
		const data = await Promise.resolve("Hello World");
		if (data)
			throw new UserError(
				"Cannot get Data",
				401,
				"Plase enter correct name and username"
			);
		res.send(data);
	})
);

app.use("/api/v1/", router);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});
