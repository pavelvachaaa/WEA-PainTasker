import { mock, describe, it } from "node:test";
import assert from "node:assert/strict";
import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction, response } from 'express';
import dotenv from 'dotenv';
import { AppError } from "../../vendor/pavel_vacha/exceptions/app_error";
import { auth } from "../../middlewares/auth.middleware";
dotenv.config();

describe("Testing auth middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    const next = mock.fn(() => {
        return true
    });

    it("Without authorization header", async () => {
        mockRequest = {};
        mockResponse = {};

        await assert.rejects(auth(
            mockRequest as Request,
            mockResponse as Response,
            next as NextFunction
        ), AppError)
    })


    it('with correct "authorization" header', async () => {
        mockRequest = {};
        mockResponse = {};
        const next = mock.fn(() => {
            return true
        });

        const token = jwt.sign({ email: 'test@example.com', _id: '123' }, process.env.SECRET_KEY as Secret);

        mockRequest = {
            headers: {
                authorization: `Bearer ${token}`
            },
        };
        console.log(process.env.SECRET_KEY)
        console.log(token)

        await assert.doesNotReject(auth(
            mockRequest as Request,
            mockResponse as Response,
            next as NextFunction
        ))


        assert.strictEqual(next.mock.calls.length, 1);

    });



    it('with incorrect "authorization" header', async () => {
        mockRequest = {};
        mockResponse = {};
        const next = mock.fn(() => {
            return true
        });

        const token = jwt.sign({ email: 'test@example.com', _id: '123' }, "NEPLATNY_KLIC");

        mockRequest = {
            headers: {
                authorization: `Bearer ${token}`
            },
        };

        await assert.rejects(auth(
            mockRequest as Request,
            mockResponse as Response,
            next as NextFunction
        ), AppError)

        assert.strictEqual(next.mock.calls.length, 0);

    });



})
