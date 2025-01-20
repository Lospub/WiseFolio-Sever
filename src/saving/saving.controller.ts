import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SavingService } from './saving.service';
import { Saving } from './entities/saving.entity';

@Controller('saving')
export class SavingController {
    constructor(private readonly savingService: SavingService) { }

    @Post()
    async create(@Body() saving: Omit<Saving, 'id'>): Promise<Saving> {
        return this.savingService.create(saving);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Saving> {
        return this.savingService.findOne(id);
    }

    @Get('user/:userId')
    async findAllByUserId(@Param('userId') userId: string): Promise<Saving[]> {
        return this.savingService.findAllByUserId(userId);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updates: Partial<Omit<Saving, 'id' | 'user_id'>>,
    ): Promise<Saving> {
        return this.savingService.update(id, updates);
    }
}
