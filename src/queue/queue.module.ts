import { Module } from "@nestjs/common";
import { QueueService } from "./queue.service";
import { QueueController } from "./queue.controller";
import { BarbersService } from "src/barbers/barbers.service";

@Module({
  controllers: [QueueController],
  providers: [QueueService, BarbersService],
})
export class QueueModule {}
