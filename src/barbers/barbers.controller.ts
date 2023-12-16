import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from "@nestjs/common";
import { BarbersService } from "./barbers.service";
import CreateBarberDto from "./dtos/create-barber";
import { Response } from "express";

@Controller("barbers")
export class BarbersController {
  constructor(private readonly barbersService: BarbersService) {}
  @Post()
  async create(@Body() data: CreateBarberDto, @Res() res: Response) {
    const barberExists = await this.barbersService.findBarberByEmail(
      data.email
    );

    if (barberExists) {
      res.status(HttpStatus.CONFLICT).json({ message: "Barbeiro ja existe" });
    }
    const barber = await this.barbersService.createBarber(data);
    return res.status(201).json(barber);
  }
}
