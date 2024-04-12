import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as Sentry from '@sentry/node';
import { MainExceptionFilter } from '@common/filters';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter
  extends MainExceptionFilter
  implements ExceptionFilter
{
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  public catch(exception: any, host: ArgumentsHost) {
    this.logger.error(exception);

    Sentry.captureException(exception);

    const context = host.switchToHttp();

    const contextResponse = context.getResponse();

    const contextRequest = context.getRequest();

    if (exception.code === 'P1017') {
      this.responseException(contextResponse, {
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        errorCode: `E${HttpStatus.SERVICE_UNAVAILABLE}`,
        message: 'Service unavailable',
        path: contextRequest.url,
      });
    } else {
      this.responseException(contextResponse, {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorCode: `E${HttpStatus.INTERNAL_SERVER_ERROR}`,
        message: 'Internal server error',
        path: contextRequest.url,
      });
    }
  }
}
