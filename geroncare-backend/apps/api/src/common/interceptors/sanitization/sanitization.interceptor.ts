import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as sanitizeHtml from 'sanitize-html';
import { Request } from 'express';

type SanitizableValue =
  | string
  | { [key: string]: SanitizableValue }
  | SanitizableValue[];

@Injectable()
export class SanitizationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { body?: SanitizableValue }>();

    if (request.body) {
      const sanitizedBody = this.sanitizeObject(
        request.body as SanitizableValue,
      );
      request.body = sanitizedBody;
    }

    return next.handle();
  }

  private sanitizeObject(obj: SanitizableValue): SanitizableValue {
    if (typeof obj === 'string') {
      return sanitizeHtml(obj, {
        allowedTags: [],
        allowedAttributes: {},
      }) as SanitizableValue;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.sanitizeObject(item)) as SanitizableValue;
    }

    if (typeof obj === 'object' && obj !== null) {
      const sanitized: { [key: string]: SanitizableValue } = {};
      const objAsRecord = obj as Record<string, unknown>;
      for (const key in objAsRecord) {
        if (Object.prototype.hasOwnProperty.call(objAsRecord, key)) {
          const value = objAsRecord[key];
          sanitized[key] = this.sanitizeObject(value as SanitizableValue);
        }
      }
      return sanitized as SanitizableValue;
    }

    return obj;
  }
}
