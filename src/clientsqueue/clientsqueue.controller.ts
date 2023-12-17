import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { ClientsqueueService } from "./clientsqueue.service";
import createClienteQueueDto from "./dtos/create-clienteQueue";
import { Response } from "express";
import attendClientDto from "./dtos/update-clienteQueue";

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
  @Get()
  async getAllClientsQueue(@Res() res: Response) {
    try {
      const queues = await this.clientsqueueService.getAllClientsQueue();
      return res.status(200).json(queues);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
  @Put()
  async attendClient(@Body() data: attendClientDto, @Res() res: Response) {
    try {
      const clientExists = await this.clientsqueueService.verifyClientExist(
        data.id
      );
      if (!clientExists) {
        return res.status(404).json({ message: "Cliente inexistente" });
      }
      const queue = await this.clientsqueueService.attendClient(data);
      if (data.isAwaiting === false) {
        const clientAttended = await this.clientsqueueService.deleteClient(
          data.id
        );
        return res.status(204).json(clientAttended);
      }
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
