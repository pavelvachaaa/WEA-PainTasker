import { test, describe, it } from "node:test";
import assert from "node:assert/strict";
import { AppError, HttpCode } from "../vendor/pavel_vacha/exceptions/app_error";


describe("constructor", () => {

    it("should create a new instance with default name and isOperational values", () => {
        const error = new AppError({ httpCode: HttpCode.BAD_REQUEST, description: "Test error" });

        assert.strictEqual(error.name, "Error")
        assert.strictEqual(error.httpCode, HttpCode.BAD_REQUEST)
        assert.strictEqual(error.message, "Test error")
        assert.strictEqual(error.isOperational, true)
    });

    it("should create a new instance with custom name and isOperational values", () => {
        const error = new AppError({
            name: "CustomError",
            httpCode: HttpCode.INTERNAL_SERVER_ERROR,
            description: "Test error",
            isOperational: false,
        });

        assert.strictEqual(error.name, "CustomError")
        assert.strictEqual(error.httpCode, HttpCode.INTERNAL_SERVER_ERROR)
        assert.strictEqual(error.message, "Test error")
        assert.strictEqual(error.isOperational, false)
    });


    it('should be able to create an operational error', () => {
        const error = new AppError({
            httpCode: HttpCode.BAD_REQUEST,
            description: 'Invalid request payload',
        });

        assert.strictEqual(error.name, "Error")
        assert.strictEqual(error.message, 'Invalid request payload')
        assert.strictEqual(error.httpCode, HttpCode.BAD_REQUEST)
        assert.strictEqual(error.isOperational, true)
    });

    it('should be able to create a non-operational error', () => {
        const error = new AppError({
            httpCode: HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Unexpected server error',
            isOperational: false,
        });
        assert.strictEqual(error.name, "Error")
        assert.strictEqual(error.message, 'Unexpected server error')
        assert.strictEqual(error.httpCode, HttpCode.INTERNAL_SERVER_ERROR)
        assert.strictEqual(error.isOperational, false)
    });

    it('should capture the stack trace', () => {
        const error = new AppError({
            httpCode: HttpCode.NOT_FOUND,
            description: 'Resource not found',
        });
        assert.notEqual(error.stack, null)
    });

    it('should use the provided error name', () => {
        const error = new AppError({
            name: 'CustomError',
            httpCode: HttpCode.BAD_REQUEST,
            description: 'Invalid request payload',
        });

        assert.strictEqual(error.name, 'CustomError')
    });
});

