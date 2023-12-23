import { Service } from "typedi";
import User, { IUser } from "../models/user.schema";
import RegisterDTO from "../dtos/register.dto";
import { AppError, HttpCode } from "../vendor/pavel_vacha/exceptions/app_error";
import { ITodo } from "../models/todo.schema";

@Service()
export default class UserRepository {

    /**
     * Pokud neexistuje uživatel, tak mu otevře účet
     * @param data - email, password, name
     * @returns - usera
     */
    public async createUser(data: RegisterDTO): Promise<boolean> {
        const doesExist = await this.getUserByEmail(data.email);

        if (doesExist) {
            throw new AppError({
                description: "Uživatel s tímto jménem již existuje",
                name: "USER_REPOSITORY",
                body: { email: data.email },
                httpCode: HttpCode.BAD_REQUEST,
            });
        }

        const user = await User.create(data);
        return !!user;
    }

    /**
     * Metoda najde uživatele dle e-mailu a dle příznaku vrátí požadované atributy
     * @returns uživatele
     */
    public async getUserByEmail(email: string, projection = {}, queryOptions = {}): Promise<IUser | null> {
        return await User.findOne({ email: email.toLowerCase() }, projection, queryOptions);
    }


    /**
     * Přiřadí k patřičnému uživateli TODO
     * @param todo ITodo
     * @param user IUser
     * @returns zdali se to povedlo
     */
    public async pushTodoToUser(todo: ITodo, user: IUser): Promise<boolean> {

        const res = await User.findByIdAndUpdate(
            user.id,
            { $push: { todos: todo._id } },
            { new: true, upsert: true },
        );

        console.log(res);
        return !!res;
    }

    /**
     * Kontroluje jestli uživatel je vlastníkem TODO
     * @param todoId - The ID of the todo to check
     * @param userId - The ID of the user
     * @returns true when deleted
    */
    public async doesUserOwnTodo(todoId: string, userId: string): Promise<boolean> {
        const user = await User.findById(userId);
        if (!user) {
            return false;
        }

        // Když to todo tam nenajdeme, je možné, že uživatel vložil malicious id, takže to musíme zkontrolovat
        const hasTodo = user.todos.some((todo) => todo.toString() === todoId);
        if (!hasTodo) {
            return false;
        }

        return true
    }

    /**
     * Smaže uživatelovo TODO
     * @param todoId - The ID of the todo to check
     * @param userId - The ID of the user
     * @returns true when deleted
     */
    public async deleteUserTodo(todoId: string, userId: string): Promise<boolean> {
        try {
            const doesOwn = await this.doesUserOwnTodo(todoId, userId);
            if (!doesOwn) {
                return false;
            }

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { todos: todoId } },
                { new: true }
            );

            if (!updatedUser) {
                return false
            }
        } catch (e) {
            return false;
        }

        return true;
    }

    /**
     * Vrátí všechny uživatelovi TODOs
     * @param data - uživatel, který to chce
     * @returns uživatelovi todos
     */
    public async getAllTodos(data: IUser): Promise<ITodo[]> {
        const user = await User.findById(data.id).populate('todos');
        if (!user) {
            throw new AppError({
                description: "Uživatel neexistuje",
                name: "USER_REPOSITORY",
                body: { email: data.email },
                httpCode: HttpCode.BAD_REQUEST,
            });
        }

        return user?.todos ?? [];

    }




}