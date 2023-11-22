import { Service } from "typedi";
import logger from "../vendor/pavel_vacha/logger/logger";

@Service()
export default class AuthController {
    
    private readonly logMetadata = { "name": "AUTH_CONTROLLER" };

    constructor() {

    }

    test() {
        logger.info("Auth controller běží", this.logMetadata)
    }
}

