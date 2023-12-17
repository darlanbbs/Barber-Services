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
}
