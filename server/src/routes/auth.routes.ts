import express, { Request, Response } from 'express';
import AuthController from '../controllers/auth.controller';
import { Container } from 'typedi';
import { requestValidator } from '../middlewares/input_validator.middleware';
import LoginDTO from '../dtos/login.dto';

const Router = express.Router();
const authController = Container.get(AuthController);


/**
 * @route POST /api/v1/auth/login
 * @description sign in user and returns jwt
 */
Router.post('/login', requestValidator(LoginDTO), (req: Request, res: Response) => authController.login(req,res))


export default Router;

