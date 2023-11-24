import { Response } from 'express';
import { AppError, HttpCode } from './app_error';
import { exitHandler } from './exit_handler';
import logger from '../logger/logger';

class ErrorHandler {
    
    /**
     * Hlavní metoda, která odchytává veškeré errory
     * @param error - AppError - vědomě vyhozeny chyby mnou, Error -> ostatní
     * @param response - Express resposne
     */
    public handleError(error: Error | AppError, response?: Response): void {
        logger.error((error.message || error) as string, error instanceof AppError ? { "body": error.body, "source": error.name } : { "source": error.name ?? "" })

        if (this.isTrustedError(error) && response) {
            this.handleTrustedError(error as AppError, response);
        } else {
            this.handleUntrustedError(error, response);
        }
    }

    public isTrustedError(error: Error): boolean {
        if (error instanceof AppError) {
            return error.isOperational;
        }

        return false;
    }

    private handleTrustedError(error: AppError, response: Response): void {
        response.status(error.httpCode).json({ message: error.message });
    }

    /**
     * Handlování erorru, ze kterého už nejsme schopni se zotavit
     * @param error - Error | AppError
     * @param response - Express response
     */
    private handleUntrustedError(error: Error | AppError, response?: Response): void {
        if (response) {
            response.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }

        console.log('Application encountered an untrusted error.');
        console.log(error);
        exitHandler.handleExit(1);
    }
}

export const errorHandler = new ErrorHandler();
