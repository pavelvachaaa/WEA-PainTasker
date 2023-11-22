import { Service } from "typedi";
import UserRepository from "../repositories/user.repository";

@Service()
export default class UserService {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async register() {

    }



}