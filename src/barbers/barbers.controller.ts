import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Get,
  Delete,
  Put,
  Res,
  Param,
} from "@nestjs/common";
import { BarbersService } from "./barbers.service";
import CreateBarberDto from "./dtos/create-barber";
import { Response } from "express";
import { UpdateBarberDto } from "./dtos/update-barber";

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
  @Get(":id")
  async findBarberById(@Param("id") id: string, @Res() res: Response) {
    try {
      const barber = await this.barbersService.findBarberById(id);
      if (!barber) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Nenhum barbeiro encontrado" });
      }
      return res.status(200).json(barber);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
  @Put(":id")
  async updateBarber(
    @Param("id") id: string,
    @Body() data: UpdateBarberDto,
    @Res() res: Response
  ) {
    try {
      const barber = await this.barbersService.findBarberById(id);
      if (!barber) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Nenhum barbeiro encontrado" });
      }
      const emailExists = await this.barbersService.findBarberByEmail(
        data.email
      );

      if (emailExists) {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: "Email ja foi utilizado" });
      }
      return await this.barbersService.updateBarber(id, data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
