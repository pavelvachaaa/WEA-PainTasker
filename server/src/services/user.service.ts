import { Service } from "typedi";
import UserRepository from "../repositories/user.repository";
import RegisterDTO from "../dtos/register.dto";

@Service()
export default class UserService {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async register(data: RegisterDTO) {
        return await this.userRepository.createUser(data);
    }



}