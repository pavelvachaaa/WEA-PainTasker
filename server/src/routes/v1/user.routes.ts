import express, { Request, Response } from 'express';
import { Container } from 'typedi';
import UserController from '../../controllers/user.controller';
import { requestValidator } from '../../middlewares/input_validator.middleware';
import RegisterDTO from '../../dtos/register.dto';

const Router = express.Router();
const userController = Container.get(UserController);

/**
 * @route POST /api/v1/users
 * @description this route creates user
 */
Router.post('/', requestValidator(RegisterDTO), (req: Request, res: Response) => userController.register(req,res))

export default Router;