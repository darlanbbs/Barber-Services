import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { ClientsqueueService } from "./clientsqueue.service";
import createClienteQueueDto from "./dtos/create-clienteQueue";
import { Response } from "express";

@Controller("clientsqueue")
export class ClientsqueueController {
  constructor(private readonly clientsqueueService: ClientsqueueService) {}

  @Post(":id")
  async createClientQueue(
    @Body() data: createClienteQueueDto,
    @Param("id") id: string, // id do barbeiro
    @Res() res: Response
  ) {
    try {
      const barberExists =
        await this.clientsqueueService.verifyBarberExists(id);
      if (!barberExists) {
        return res.status(404).json({ message: "Barbeiro inexistente" });
      }
      const existQueue = await this.clientsqueueService.verifyQueueExists(
        data.queueId
      );
      if (!existQueue) {
        return res
          .status(409)
          .json({ message: "Não existe uma fila para o dia" });
      }
      const queue = await this.clientsqueueService.createQueue(data);
      return res.status(201).json(queue);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
