import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Errors } from '../entities/errors';
import { CannotCreateEntityIdMapError, EntityNotFoundError, QueryFailedError } from 'typeorm';

@Catch(HttpException, QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status;
    let message;
    switch (exception.constructor) {
      case HttpException:
        status = exception.getStatus();
        message = exception.getResponse()['message'];
        break;
      case QueryFailedError:
      case EntityNotFoundError:
      case CannotCreateEntityIdMapError:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = Errors.INTERNAL_ERROR;
        break;
      default:
        status = exception.getStatus();
        message = exception.getResponse()['message'];
    }

    response.status(status).json({ status, message });
  }
}
