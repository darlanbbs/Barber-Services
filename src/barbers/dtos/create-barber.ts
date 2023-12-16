import { IsEmail, IsNotEmpty, Validate } from "class-validator";
import { PhoneNumberValidator } from "./phoneNumber_Validator";

export default class CreateBarberDto {
  @IsNotEmpty({ message: "Nome é obrigatorio" })
  name: string;
  @IsNotEmpty({ message: "Email é obrigatorio" })
  @IsEmail({}, { message: "Email invalido" })
  email: string;
  @Validate(PhoneNumberValidator, {
    message: "O número de telefone não é válido.",
  })
  phone: string;
}
