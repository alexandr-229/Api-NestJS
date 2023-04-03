import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
import { ID_VALIDATION_ERROR } from './validation.const';

@Injectable()
export class IdValidationPipe implements PipeTransform {
	transform(value: string, metadata: ArgumentMetadata) {
		if (metadata.type !== 'param') {
			return value;
		}
		if (!Types.ObjectId.isValid(value)) {
			throw new HttpException(ID_VALIDATION_ERROR, HttpStatus.BAD_REQUEST);
		}
		return value;
	}
}
