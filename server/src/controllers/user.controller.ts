import { Service } from "typedi";
import logger from "../vendor/pavel_vacha/logger/logger";
import { Request, Response } from "express";
import UserService from "../services/user.service";
import Controller from "./controller";
import RegisterDTO from "../dtos/register.dto";

@Service()
export default class UserController extends Controller {
    private userService: UserService;

    constructor(userService: UserService) {
        super()
        this.userService = userService;
    }

    public async register(req: Request, res: Response) {
        const result = await this.userService.register(req.body as RegisterDTO);
        return this.send({ message: "Úspěšně jsme vás registrovali", data: result }, res);
    }
}

