import { Body, Controller, Post, Res } from "@nestjs/common";
import { QueueService } from "./queue.service";
import { BarbersService } from "src/barbers/barbers.service";
import createQueueDto from "./dtos/create-queue";
import { Response } from "express";

@Controller("queue")
export class QueueController {
  constructor(
    private readonly queueService: QueueService,
    private readonly barberServices: BarbersService
  ) {}

  @Post()
  async createQueue(@Body() data: createQueueDto, @Res() res: Response) {
    try {
      const barberExist = await this.barberServices.findBarberById(
        data.barberId
      );
      if (!barberExist) {
        return res.status(404).json({ message: "Barbeiro inexistente" });
      }
      const existQueue = await this.queueService.verifyExistQueueToday(
        data.barberId
      );

      if (existQueue) {
        return res
          .status(409)
          .json({ message: "Ja existe uma chamada para o dia" });
      }
      const queue = await this.queueService.createQueue(data);
      return res.status(201).json(queue);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
