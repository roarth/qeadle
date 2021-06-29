import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StatsService } from './stats.service';

@Controller('stats')
@UseGuards(AuthGuard())
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get()
  getStats() {
    return this.statsService.getStats();
  }
}
