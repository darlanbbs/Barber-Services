import { IsNotEmpty } from "class-validator";

export default class attendClientDto {
  @IsNotEmpty({ message: "O ID do cliente não pode ser vazio" })
  id: number;
  @IsNotEmpty({ message: "Atualize o status do atendimento" })
  isAwaiting: boolean;
}
