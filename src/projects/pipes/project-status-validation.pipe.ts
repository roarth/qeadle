import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ProjectStatus } from '../project-status.enum';

export class ProjectStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [ProjectStatus.OPEN, ProjectStatus.CLOSED];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
