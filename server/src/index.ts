import "reflect-metadata"

import express, { Express, Request, Response, Application } from 'express';
import cors from "cors";
import logger from './vendor/pavel_vacha/logger/logger';
import AuthController from "./controllers/auth.controller";
import { Container } from 'typedi';

const app: Application = express();
const port = process.env.APP_PORT || 8000;
const cCPUs = require('os').cpus().length;

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get('/_health', (req: Request, res: Response) => {
    res.send('ok');
});

app.listen(port, () => {
    const userController = Container.get(AuthController);
    userController.test()
    logger.info(`Number of CPUc: ${cCPUs} `,)
    logger.info(`Server is Fire at http://localhost:${port}`)
});