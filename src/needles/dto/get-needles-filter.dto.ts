import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { NeedleEnvironment } from '../enum/needle-environment.enum';
import { NeedleResult } from '../enum/needle-result.enum';
import { NeedleType } from '../enum/needle-type.enum';

export class GetNeedlesFilterDto {
  @IsOptional()
  @IsIn([NeedleType.CYPRESS, NeedleType.POSTMAN])
  type: NeedleType;

  @IsNotEmpty()
  @IsIn([NeedleResult.SUCCESS, NeedleResult.FAILURE, NeedleResult.UNKNOWN])
  result: NeedleResult;

  @IsNotEmpty()
  @IsIn([NeedleEnvironment.CI, NeedleEnvironment.LOCAL])
  environment: NeedleEnvironment;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
