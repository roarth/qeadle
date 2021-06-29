import { IsIn, IsNotEmpty, IsUUID } from 'class-validator';
import { NeedleEnvironment } from '../enum/needle-environment.enum';
import { NeedleResult } from '../enum/needle-result.enum';
import { NeedleType } from '../enum/needle-type.enum';

export class CreateNeedleDto {
  @IsNotEmpty()
  @IsIn([NeedleType.CYPRESS, NeedleType.POSTMAN])
  type: NeedleType;

  @IsNotEmpty()
  @IsIn([NeedleResult.SUCCESS, NeedleResult.FAILURE, NeedleResult.UNKNOWN])
  result: NeedleResult;

  @IsNotEmpty()
  @IsIn([NeedleEnvironment.CI, NeedleEnvironment.LOCAL])
  environment: NeedleEnvironment;

  @IsNotEmpty()
  @IsUUID()
  project: string;
}
