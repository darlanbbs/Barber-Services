import { IsNotEmpty } from "class-validator";

export default class createQueueDto {
  @IsNotEmpty({ message: "Id do barbeiro é obrigatorio" })
  barberId: string;
}
