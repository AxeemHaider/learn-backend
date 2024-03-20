import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  created_by: number;

  @IsString()
  @IsNotEmpty()
  cruncy_code: string;
}
