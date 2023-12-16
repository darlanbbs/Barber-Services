import { IsEmail, IsNotEmpty } from "class-validator";

export default class CreateBarberDto {
  @IsNotEmpty({ message: "Nome é obrigatorio" })
  name: string;
  @IsNotEmpty({ message: "Email é obrigatorio" })
  @IsEmail({}, { message: "Email invalido" })
  email: string;
  phone: string;
}
