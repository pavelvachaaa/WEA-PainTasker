import 'express-async-errors';
import "reflect-metadata";
import 'dotenv/config'

import http from 'http';
import cors from "cors";
import express, { Request, Response, NextFunction, Express } from 'express';

import { createHttpTerminator } from 'http-terminator';
import { errorHandler } from "./vendor/pavel_vacha/exceptions/error_handler";
import logger from './vendor/pavel_vacha/logger/logger';
import connectMongo from "./infra/mongodb/db";

import userRoutes from "./routes/v1/user.routes";
import authRoutes from "./routes/v1/auth.routes";
import todoRoutes from "./routes/v1/todo.routes";

export let app: Express = express();

const port = process.env.APP_PORT || 8000;
const cCPUs = require('os').cpus().length;
const connectionString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://127.0.0.1/todoapp';
const dbName = process.env.MONGO_DB_NAME || 'test';

app.use(cors());

export const server = http.createServer(app);
export const httpTerminator = createHttpTerminator({
    server,
});

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(`/api/v1/users`, userRoutes);
app.use(`/api/v1/auth`, authRoutes);
app.use(`/api/v1/todos`, todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler.handleError(err, res);
});

connectMongo(connectionString, dbName)

server.listen(port, () => {
    logger.info(`Number of CPUc: ${cCPUs} `,)
    logger.info(`⚡️[server]: Spustili jsme server na http://localhost:${port}`)
});