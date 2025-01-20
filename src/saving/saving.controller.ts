import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.savingService.remove(id);
    }

    @Get(':id/saved')
    async calculateSaved(@Param('id') id: string): Promise<{ saved: number }> {
        const saved = await this.savingService.calculateSaved(id);
        return { saved };
    }
}
