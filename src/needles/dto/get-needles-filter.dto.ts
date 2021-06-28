import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { NeedleType } from '../needle-type.enum';

export class GetNeedlesFilterDto {
  @IsOptional()
  @IsIn([NeedleType.CYPRESS, NeedleType.POSTMAN])
  type: NeedleType;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
