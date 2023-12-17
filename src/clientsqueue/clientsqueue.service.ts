import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import createClienteQueueDto from "./dtos/create-clienteQueue";

@Injectable()
export class ClientsqueueService {
  constructor(private readonly prisma: PrismaService) {}

  async createQueue(data: createClienteQueueDto) {
    return await this.prisma.clientsQueue.create({
      data,
    });
  }

  async verifyBarberExists(id: string) {
    return await this.prisma.barber.findUnique({ where: { id } });
  }
  async verifyQueueExists(id: string) {
    return await this.prisma.queue.findUnique({ where: { id } });
  }
}
