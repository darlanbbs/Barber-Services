import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import CreateBarberDto from "./dtos/create-barber";

@Injectable()
export class BarbersService {
  constructor(private readonly prisma: PrismaService) {}
  async findBarberByEmail(email: string): Promise<any> {
     await this.prisma.barber.findFirst({ where: { email } });
  }
  async createBarber(data: CreateBarberDto) {
    await this.prisma.barber.create({ data });
  }
}
