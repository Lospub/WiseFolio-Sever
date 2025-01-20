import { Body, Controller, Post } from '@nestjs/common';
import { SavingService } from './saving.service';
import { Saving } from './entities/saving.entity';

@Controller('saving')
export class SavingController {
    constructor(private readonly savingService: SavingService) { }

    @Post()
    async create(@Body() saving: Omit<Saving, 'id'>): Promise<Saving> {
        return this.savingService.create(saving);
    }
}
