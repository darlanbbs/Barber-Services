import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Get,
  Delete,
  Put,
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
    try {
      const barberExists = await this.barbersService.findBarberByEmail(
        data.email
      );

      if (barberExists) {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: "Barbeiro já existe" });
      }

      const barber = await this.barbersService.createBarber(data);

      if (!barber) {
        return res
          .status(HttpStatus.EXPECTATION_FAILED)
          .json({ message: "Erro ao criar o barbeiro" });
      }

      return res.status(201).json(barber);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  @Get()
  async getAllBarbers(@Res() res: Response) {
    try {
      const barbers = await this.barbersService.findAllBarbers();
      if (!barbers) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Nenhum barbeiro encontrado" });
      }
      return res.status(200).json(barbers);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
