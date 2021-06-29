import { BadRequestException, PipeTransform } from '@nestjs/common';
import { NeedleType } from '../enum/needle-type.enum';

export class NeedleTypeValidationPipe implements PipeTransform {
  readonly allowedTypes = [NeedleType.CYPRESS, NeedleType.POSTMAN];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isTypeValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid type`);
    }
    return value;
  }

  private isTypeValid(status: any) {
    const idx = this.allowedTypes.indexOf(status);
    return idx !== -1;
  }
}
