import { IsDefined } from "class-validator";
import { Expose } from "class-transformer";

export default class UpdateTodoDTO {
    @IsDefined()
    @Expose()
    title!: string;
}