import express, { Request, Response } from 'express';
import { requestValidator } from '../../middlewares/input_validator.middleware';
import CreateTodoDTO from '../../dtos/create_todo.dto';
import Container from 'typedi';
import TodoController from '../../controllers/todo.controller';
import { CustomRequest, auth } from '../../middlewares/auth.middleware';
import DeleteTodoDTO from '../../dtos/delete_todo.dto';
import UpdateTodoDTO from '../../dtos/update_todo';
import ResourceDTO from '../../dtos/resource.dto';

const Router = express.Router();
const todoController = Container.get(TodoController);

/**
 * @route PUT /api/v1/todos
 * @description this route creates todo
 */
Router.post('/', requestValidator(CreateTodoDTO), auth, (req: Request, res: Response) => todoController.create(req as CustomRequest, res))


/**
 * @route DELETE /api/v1/todos/:id
 * @description this route deletes todo
 */
Router.delete('/:id', requestValidator(DeleteTodoDTO), auth, (req: Request, res: Response) => todoController.delete(req as CustomRequest, res))

/**
 * @route UPDATE /api/v1/todos/:id
 * @description this route updates todo
 */
Router.put('/:id', requestValidator(UpdateTodoDTO), auth, (req: Request, res: Response) => todoController.update(req as CustomRequest, res))


/**
 * @route GET /api/v1/todos
 * @description returns all of user todos
 */
Router.get('/', auth, (req: Request, res: Response) => todoController.getAll(req as CustomRequest, res))


/**
 * @route GET /api/v1/todos/:id
 * @description this route returns specific todo
 */
Router.get('/:id', requestValidator(ResourceDTO), auth, (req: Request, res: Response) => todoController.get(req as CustomRequest, res))





export default Router;