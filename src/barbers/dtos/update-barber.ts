import { PartialType } from "@nestjs/mapped-types";
import CreateBarberDto from "./create-barber";

export class UpdateBarberDto extends PartialType(CreateBarberDto) {}
