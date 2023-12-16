import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import CreateBarberDto from "./dtos/create-barber";
import { UpdateBarberDto } from "./dtos/update-barber";

@Injectable()
export class BarbersService {
  constructor(private readonly prisma: PrismaService) {}
  async findBarberByEmail(email: string): Promise<CreateBarberDto> {
    return await this.prisma.barber.findFirst({ where: { email } });
  }
  async createBarber(data: CreateBarberDto): Promise<CreateBarberDto> {
    const createdBarber = await this.prisma.barber.create({ data });
    return createdBarber;
  }
  async findAllBarbers() {
    return await this.prisma.barber.findMany();
  }
  async findBarberById(id: string) {
    return await this.prisma.barber.findUnique({ where: { id } });
  }
  async updateBarber(
    id: string,
    data: UpdateBarberDto
  ): Promise<UpdateBarberDto> {
    const updateBarber = await this.prisma.barber.update({
      where: { id },
      data,
    });
    return updateBarber;
  }
}
