import { ArgumentsHost, Catch, HttpException, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { LoggerService } from "./logger/logger.service";
import { Request, Response } from "express";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

type ResObject = {
    statusCode: number;
    timestamp: string;
    path: string;
    response: string | object;
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly Logger = new LoggerService(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const resObject: ResObject = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: ''
        }

        if (exception instanceof HttpException) {
            resObject.statusCode = exception.getStatus();
            resObject.response = exception.getResponse();
        } else if (exception instanceof PrismaClientValidationError) {
            resObject.statusCode = 422;
            resObject.response = exception.message.replaceAll(/\n/g, '');
        } else {
            resObject.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            resObject.response = 'Internal Server Error';
        }

        response.status(resObject.statusCode).json(resObject);

        this.Logger.error(resObject.response, AllExceptionsFilter.name);

        super.catch(exception, host);
    }
}