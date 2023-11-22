import { Service } from "typedi";

@Service()
export default class TodoService {
    private readonly todoRepository: any;

    constructor(todoRepository: any) {
        this.todoRepository = todoRepository;
    }

    async register() {

    }


}