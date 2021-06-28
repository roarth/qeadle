import {
  Body,
  Logger,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateNeedleDto } from './dto/create-needle.dto';
import { GetNeedlesFilterDto } from './dto/get-needles-filter.dto';
import { Needle } from './needle.entity';
import { NeedlesService } from './needles.service';

@Controller('needles')
@UseGuards(AuthGuard())
export class NeedlesController {
  private logger = new Logger('NeedlesController');
  constructor(private needleService: NeedlesService) {}

  @Get()
  getNeedles(
    @GetUser() user: User,
    @Query(ValidationPipe) filterDto: GetNeedlesFilterDto,
  ): Promise<Needle[]> {
    this.logger.verbose(
      `User "${user.email}" retrieving all Projects. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.needleService.getNeedles(filterDto, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createNeedle(
    @Body() createNeedleDto: CreateNeedleDto,
    @GetUser() user: User,
  ): Promise<Needle> {
    this.logger.verbose(
      `User "${user.email}" creating a Project. Data: ${JSON.stringify(
        createNeedleDto,
      )}`,
    );
    return this.needleService.createNeedle(createNeedleDto, user);
  }
}
