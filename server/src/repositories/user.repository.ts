import { Service } from "typedi";
import User, { IUser } from "../models/user.schema";
import RegisterDTO from "../dtos/register.dto";
import { AppError, HttpCode } from "../vendor/pavel_vacha/exceptions/app_error";

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




}