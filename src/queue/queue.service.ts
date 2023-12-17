import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import createQueueDto from "./dtos/create-queue";

@Injectable()
export class QueueService {
  constructor(private readonly prisma: PrismaService) {}
  async createQueue(data: createQueueDto) {
    return await this.prisma.queue.create({ data });
  }
  async verifyExistQueueToday(barberId: string) {
    return await this.prisma.queue.findFirst({
      where: {
        date: {
          equals: new Date(),
        },
        barberId,
      },
    });
  }
  async getAllQueuesToday() {
    return await this.prisma.queue.findMany({
      where: {
        date: {
          equals: new Date(),
        },
      },
      include: {
        barber: true,
        ClientsQueue: true,
      },
    });
  }
  async getAllQueuesById(barberId: string) {
    return await this.prisma.queue.findMany({
      where: {
        barberId,
      },
      include: {
        barber: true,
        ClientsQueue: true,
      },
    });
  }
  async getAllQueues() {
    return await this.prisma.queue.findMany({
      where: {
        date: {
          equals: new Date(),
        },
      },
      include: {
        barber: true,
        ClientsQueue: true,
      },
    });
  }
}
