import { IsDefined } from "class-validator";
import { Expose } from "class-transformer";

export default class ResourceDTO {
    @IsDefined()
    @Expose()
    id!: string;
}