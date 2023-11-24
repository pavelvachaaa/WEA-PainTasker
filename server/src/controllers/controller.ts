import { Response } from "express";
import { ApiResponse, IApiResponse } from "../vendor/pavel_vacha/interfaces/api_response.interface";

/**
 * Bázová třída pro kontrolery v aplikaci
 */
export default class Controller {

    /**
     * Abstrakce nad odesíláním dat zpátky ke klientovi
     * @param data - IApiResponse
     * @param res - Express Response
     * @returns vrácí HTTP odpoveď klientovi
     */
    public send(data: IApiResponse, res: Response) {
        return new ApiResponse(data).send(res); 
    }


}