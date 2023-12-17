import { Module } from '@nestjs/common';
import { ClientsqueueService } from './clientsqueue.service';
import { ClientsqueueController } from './clientsqueue.controller';

@Module({
  controllers: [ClientsqueueController],
  providers: [ClientsqueueService],
})
export class ClientsqueueModule {}
