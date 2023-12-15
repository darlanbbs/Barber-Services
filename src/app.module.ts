import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { BarbersModule } from './barbers/barbers.module';

@Module({
	imports: [PrismaModule, BarbersModule],
})
export class AppModule {}
