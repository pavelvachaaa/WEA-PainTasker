import { IsDefined, IsEmail, MinLength } from "class-validator";
import { Expose } from "class-transformer";

export default class RegisterDTO {

    @IsDefined()
    @IsEmail({}, { message: "Neplatný formát e-mailu" })
    @Expose()
    email!: string;

    @IsDefined()
    @Expose()
    name!: string;

    @IsDefined()
    @MinLength(6, {message: "Heslo musí být delší než 6 znaků"})
    @Expose()
    password!: string;

}