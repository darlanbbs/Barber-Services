import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { BarbersModule } from './barbers/barbers.module';
import { QueueModule } from './queue/queue.module';
import { ClientsqueueModule } from './clientsqueue/clientsqueue.module';

@Module({
	imports: [PrismaModule, BarbersModule, QueueModule, ClientsqueueModule],
})
export class AppModule {}
