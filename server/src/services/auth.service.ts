import { Service } from "typedi";
import UserRepository from "../repositories/user.repository";
import LoginDTO from "../dtos/login.dto";
import { AppError, HttpCode } from "../vendor/pavel_vacha/exceptions/app_error";
import jwt, { Secret } from 'jsonwebtoken';

@Service()
export default class AuthService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async login(data: LoginDTO): Promise<any> {
        if (!process.env.SECRET_KEY) {
            throw new AppError({
                description: "Omlouváme se, ale naše přihlašovací služba má výpadek!",
                name: "AUTH_SERVICE",
                body: { email: data.email },
                httpCode: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }

        const user = await this.userRepository.getUserByEmail(data.email, {}, { select: '+password' });
        if (!user) {
            throw new AppError({
                description: "Neplatné přihlašovací údaje",
                name: "AUTH_SERVICE",
                body: { email: data.email },
                httpCode: HttpCode.BAD_REQUEST,
            });
        }

        const isPasswordMatched = await user.comparePassword(data.password);
        if (!isPasswordMatched) {
            throw new AppError({
                description: "Neplatné přihlašovací údaje",
                name: "AUTH_SERVICE",
                body: { email: data.email },
                httpCode: HttpCode.BAD_REQUEST,
            });
        }

        const token = jwt.sign({ email: user.email, name: user.name, id: user.id }, process.env.SECRET_KEY as Secret, {
            expiresIn: '30 days',
        });

        return { token: token }
    }

}