import { Service } from "typedi";
import CreateTodoDTO from "../dtos/create_todo.dto";
import { IUser } from "../models/user.schema";
import TodoRepository from "../repositories/todo.repository";
import UserRepository from "../repositories/user.repository";
import DeleteTodoDTO from "../dtos/delete_todo.dto";
import { AppError, HttpCode } from "../vendor/pavel_vacha/exceptions/app_error";
import UpdateTodoDTO from "../dtos/update_todo";
import { ITodo } from "../models/todo.schema";

@Service()
export default class TodoService {
    private readonly todoRepository: TodoRepository;
    private readonly userRepository: UserRepository;

    constructor(todoRepository: TodoRepository, userRepository: UserRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }

    /**
     * Pokud je uživatel přihlášen vrátí dané todo podle id 
     * @param todoId 
     * @param user 
     * @returns Jedno todo
     */
    async get(todoId: string, user: IUser) {
        const doesUserOwnTodo = await this.userRepository.doesUserOwnTodo(todoId, user.id);
        if (!doesUserOwnTodo) {
            throw new AppError({
                description: "Toto není vaše TODO",
                name: "TODO_SERVICE",
                body: { id: todoId },
                httpCode: HttpCode.BAD_REQUEST,
            });
        }


        return await this.todoRepository.getTodo(todoId);

    }

    /**
     * Pokud je uživatel přihlášen vezme všechny jeho Todos
     * @param user 
     * @returns list of todos
     */
    async getAll(user: IUser) {
        return await this.userRepository.getAllTodos(user);
    }

    /**
     * K právě přihlášenému uživateli vytvoří TODO
     * @param data 
     * @param user 
     * @returns nové TODO
     */
    async createTodo(data: CreateTodoDTO, user: IUser): Promise<ITodo> {
        const todo = this.todoRepository.createTodo(data);
        const res = await this.userRepository.pushTodoToUser(todo, user);

        if (!res) {
            throw new AppError({
                description: "Nepovedlo se nám přidat TODO",
                name: "TODO_SERVICE",
                body: { title: data.title },
                httpCode: HttpCode.BAD_REQUEST,
            });
        }

        return todo
    }

    /**
     * Na základě ID a ownershipu k todo smaže todo 
     * @param data 
     * @param user 
     * @returns zdali se to povedlo
     */
    async deleteTodo(data: DeleteTodoDTO, user: IUser): Promise<boolean> {
        const deletedFromUser = await this.userRepository.deleteUserTodo(data.id, user.id);

        if (!deletedFromUser) {
            throw new AppError({
                description: "Nemohli jsme najít TODO",
                name: "TODO_SERVICE",
                body: { id: data.id },
                httpCode: HttpCode.BAD_REQUEST,
            });
        }


        const deleted = await this.todoRepository.deleteTodo(data);


        if (!deleted) {
            throw new AppError({
                description: "Nepodařilo se nám smazat TODO",
                name: "TODO_SERVICE",
                body: { id: data.id },
                httpCode: HttpCode.BAD_REQUEST,
            });
        }

        return deleted;
    }

    /**
     * Upravuje title a isdone
     * @param todoId 
     * @param data 
     * @param user 
     * @returns zdali se to povedlo
     */
    async updateTodo(todoId: string, data: UpdateTodoDTO, user: IUser): Promise<boolean> {
        const doesUserOwnTodo = await this.userRepository.doesUserOwnTodo(todoId, user.id);
        if (!doesUserOwnTodo) {
            throw new AppError({
                description: "Toto není vaše TODO",
                name: "TODO_SERVICE",
                body: { id: todoId },
                httpCode: HttpCode.BAD_REQUEST,
            });
        }

        const res = await this.todoRepository.updateTodo(todoId, data);
        if (!res) {
            throw new AppError({
                description: "Při aktualizaci nastala chyba",
                name: "TODO_SERVICE",
                body: { id: todoId },
                httpCode: HttpCode.BAD_REQUEST,
            });
        }


        return res
    }


}