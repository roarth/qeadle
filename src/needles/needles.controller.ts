import { Controller } from '@nestjs/common';
import { NeedlesService } from './needles.service';

@Controller('needles')
export class NeedlesController {
  constructor(private needleService: NeedlesService) {}
}
