import { IsDefined } from "class-validator";
import { Expose } from "class-transformer";

export default class DeleteTodoDTO {
    @IsDefined()
    @Expose()
    id!: string;
}