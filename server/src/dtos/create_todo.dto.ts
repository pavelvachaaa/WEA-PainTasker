import { IsDefined } from "class-validator";
import { Expose } from "class-transformer";

export default class CreateTodoDTO {
    @IsDefined()
    @Expose()
    title!: string;
}