import { Service } from "typedi";
import UserRepository from "../repositories/user.repository";
import RegisterDTO from "../dtos/register.dto";

@Service()
export default class UserService {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }


    /**
     * Na základě předaných parametrů je uživatel vytvořen v DB
     * @param data 
     * @returns zdali se povedlo
     */
    async register(data: RegisterDTO): Promise<boolean> {
        return await this.userRepository.createUser(data);
    }
}