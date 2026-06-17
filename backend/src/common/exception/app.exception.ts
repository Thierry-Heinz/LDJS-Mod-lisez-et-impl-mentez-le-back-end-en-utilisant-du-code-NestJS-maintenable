// src/common/exceptions/app.exception.ts
import { HttpException } from '@nestjs/common';
import { AppErrors } from '../errors/app-errors';

export class AppException extends HttpException {
  constructor(error: (typeof AppErrors)[keyof typeof AppErrors]) {
    super({ code: error.code, message: error.message }, error.status);
  }
}
