import { IsIn, IsNotEmpty } from 'class-validator';
import { NeedleType } from '../needle-type.enum';

export class CreateNeedleDto {
  @IsNotEmpty()
  @IsIn([NeedleType.CYPRESS, NeedleType.POSTMAN])
  type: NeedleType;
}
