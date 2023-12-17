import { Controller } from '@nestjs/common';
import { ClientsqueueService } from './clientsqueue.service';

@Controller('clientsqueue')
export class ClientsqueueController {
  constructor(private readonly clientsqueueService: ClientsqueueService) {}
}
