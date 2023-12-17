import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import createClienteQueueDto from "./dtos/create-clienteQueue";
import attendClientDto from "./dtos/update-clienteQueue";

@Injectable()
export class ClientsqueueService {
  constructor(private readonly prisma: PrismaService) {}

  async createQueue(data: createClienteQueueDto) {
    return await this.prisma.clientsQueue.create({
      data,
    });
  }

  async getAllClientsQueue() {
    return await this.prisma.clientsQueue.findMany();
  }
  async verifyBarberExists(id: string) {
    return await this.prisma.barber.findUnique({ where: { id } });
  }
  async verifyQueueExists(id: string) {
    return await this.prisma.queue.findUnique({ where: { id } });
  }
  async verifyClientExist(id: number) {
    return await this.prisma.clientsQueue.findUnique({ where: { id } });
  }
  async attendClient(data: attendClientDto) {
    return await this.prisma.clientsQueue.update({
      where: { id: data.id },
      data: { isAwaiting: data.isAwaiting },
    });
  }
  async deleteClient(id: number) {
    return await this.prisma.clientsQueue.delete({
      where: { id },
    });
  }
}
