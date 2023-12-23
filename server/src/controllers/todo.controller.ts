import { Service } from "typedi";
import { Response } from "express";
import Controller from "./controller";
import TodoService from "../services/todo.service";
import CreateTodoDTO from "../dtos/create_todo.dto";
import { CustomRequest } from "../middlewares/auth.middleware";
import { IUser } from "../models/user.schema";
import DeleteTodoDTO from "../dtos/delete_todo.dto";
import UpdateTodoDTO from "../dtos/update_todo";
import { AppError, HttpCode } from "../vendor/pavel_vacha/exceptions/app_error";

@Service()
export default class TodoController extends Controller {
    private todoService: TodoService;

    constructor(todoService: TodoService) {
        super()
        this.todoService = todoService;
    }


    public async getAll(req: CustomRequest, res: Response) {
        const result = await this.todoService.getAll(req.userData as IUser);

        return this.send({ message: "Úspěšně jsme vytvořili položku", data: result }, res);
    }

    public async get(req: CustomRequest, res: Response) {
        if (!req.params.id) {
            throw new AppError({
                description: "Nezadali jste ID",
                name: "TODO_CONTROLLER",
                body: {},
                httpCode: HttpCode.BAD_REQUEST,
            });
        }

        const result = await this.todoService.get(req.params.id, req.userData as IUser);

        return this.send({ message: "Úspěšně jsme vytvořili položku", data: result }, res);
    }

    public async create(req: CustomRequest, res: Response) {
        const result = await this.todoService.createTodo(req.body as CreateTodoDTO, req.userData as IUser);

        return this.send({ message: "Úspěšně jsme vytvořili položku", data: result }, res);
    }

    public async delete(req: CustomRequest, res: Response) {
        const result = await this.todoService.deleteTodo({ id: req.params.id } as DeleteTodoDTO, req.userData as IUser);

        return this.send({ message: "Úspěšně jsme smazali položku", data: result }, res);
    }

    public async update(req: CustomRequest, res: Response) {
        if (!req.params.id) {
            throw new AppError({
                description: "Nezadali jste ID",
                name: "TODO_CONTROLLER",
                body: {},
                httpCode: HttpCode.BAD_REQUEST,
            });
        }

        const result = await this.todoService.updateTodo(req.params.id, req.body as UpdateTodoDTO, req.userData as IUser);

        return this.send({ message: "Úspěšně jsme upravili položku", data: result }, res);
    }
}

