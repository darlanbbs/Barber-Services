import { IsNotEmpty } from "class-validator";

export default class createClienteQueueDto {
  @IsNotEmpty({ message: "O ID da fila não pode ser vazio" })
  queueId: string;
  @IsNotEmpty({ message: "Digite seu Nome" })
  name: string;
  @IsNotEmpty({ message: "Escolha um serviço" })
  services: string;
}
