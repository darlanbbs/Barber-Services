import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { BarbersModule } from './barbers/barbers.module';
import { QueueModule } from './queue/queue.module';

@Module({
	imports: [PrismaModule, BarbersModule, QueueModule],
})
export class AppModule {}
