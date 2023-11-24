import { Service } from "typedi";
import { Request, Response } from "express";
import LoginDTO from "../dtos/login.dto";
import AuthService from "../services/auth.service";
import Controller from "./controller";

@Service()
export default class AuthController extends Controller {
    private authService: AuthService;

    constructor(authService: AuthService) {
        super()
        this.authService = authService;
    }

    async login(req: Request, res: Response) {
        const result = await this.authService.login(req.body as LoginDTO);
        return this.send({ message: "Úspěšně jsme vás přihlásili", data: result }, res);
    }

}
