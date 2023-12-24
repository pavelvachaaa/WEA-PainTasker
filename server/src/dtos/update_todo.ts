import { IsBoolean, IsDefined, IsString } from "class-validator";
import { Expose } from "class-transformer";

export default class UpdateTodoDTO {
    @IsString()
    @Expose()
    title!: string;

    @IsBoolean()
    @Expose()
    isDone!: boolean;
}