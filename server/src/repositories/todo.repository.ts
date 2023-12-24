import { Service } from "typedi";
import CreateTodoDTO from "../dtos/create_todo.dto";
import Todo, { ITodo } from "../models/todo.schema";
import DeleteTodoDTO from "../dtos/delete_todo.dto";
import UpdateTodoDTO from "../dtos/update_todo";

@Service()
export default class TodoRepository {

    public async getTodo(todoId: string) {
        return await Todo.findById(todoId);
    }

    /**
     * Tato metoda vytváří v kolekci todos záznam o TODO
     * @param data - title
     * @returns - todo
     */
    public createTodo(data: CreateTodoDTO): ITodo {
        const todo = new Todo(data);
        todo.save()
        return todo;
    }

    /**
     * Tato metoda maže položku z kolekce todos
     * @param data id položky
     * @returns jestli se úspěšně smazala
     */
    public async deleteTodo(data: DeleteTodoDTO): Promise<boolean> {
        const res = await Todo.deleteOne({ _id: data.id })
        return res.deletedCount > 0;
    }

    /**
     * Tato metoda upravuje položku z kolekce todos
     * @param todoId idčko todo
     * @param data title
     * @returns zdali se povedlo upravit
     */
    public async updateTodo(todoId: string, data: UpdateTodoDTO): Promise<boolean> {
        const res = await Todo.findByIdAndUpdate(todoId, { title: data.title, isDone: data.isDone });
        // todo check if that was succsesful (todo wasnt found. etc-)
        return !!res;
    }

}