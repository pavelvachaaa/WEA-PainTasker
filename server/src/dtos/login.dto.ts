import { IsDefined } from "class-validator";
import { Expose } from "class-transformer";

export default class LoginDTO {

    @IsDefined()
    @Expose()
    email!: string;

    @IsDefined()
    @Expose()
    password!: string;

}