import { HttpException, HttpStatus } from '@nestjs/common';

export class Precondition {
  static filterErrors(
    condition: boolean,
    errorMessage: string,
    statusCode: HttpStatus,
  ) {
    if (!condition) {
      throw new HttpException(errorMessage, statusCode);
    }
  }
}
