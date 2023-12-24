import { validate, } from "class-validator";
import { plainToClass } from "class-transformer";
import { NextFunction, Request } from "express";
import { AppError, HttpCode } from "../vendor/pavel_vacha/exceptions/app_error";

/**
 * Funkce dostane jako parametr DTO (data transfer object) a zkontroluje zdali pooždavek
 * od uživatele odpovída parametrům DTO
 * @param dtoClass - DTO
 */
export const requestValidator = (dtoClass: any): any => {
    return async function (req: Request, res: Response, next: NextFunction) {
        let body = req.body;
        if (req.method === "DELETE" || req.method === "GET") {
            body = { id: req.params.id }
        }
        const output: any = plainToClass(dtoClass, body);
        const errors = await validate(output, { skipMissingProperties: true, whitelist: true, forbidNonWhitelisted: true })

        if (errors.length > 0) {
            const errorMessage = errors.map((error: any) => error.constraints[Object.keys(error.constraints)[0]])
            throw new AppError({ description: `Vyplnili jste špatně formulář. Zkuste to znovu. (${errorMessage})`, httpCode: HttpCode.BAD_REQUEST, isOperational: true })
        }
        next();
    };
};
