import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { Budget } from './entities/budget.entity';

@Controller('budgets')
export class BudgetController {
    constructor(private readonly budgetService: BudgetService) {}

    @Post()
    async create(@Body() budget: Omit<Budget, 'id'>): Promise<Budget> {
        return this.budgetService.create(budget);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Budget> {
        return this.budgetService.findOne(id);
    }

    @Get('user/:userId')
    async findAllByUserId(@Param('userId') userId: string): Promise<Budget[]> {
        return this.budgetService.findAllByUserId(userId);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updates: Partial<Omit<Budget, 'id' | 'user_id'>>,
    ): Promise<Budget> {
        return this.budgetService.update(id, updates);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.budgetService.remove(id);
    }

    @Get(':id/spent')
    async calculateSpent(@Param('id') id: string): Promise<{ spent: number }> {
        const spent = await this.budgetService.calculateSpent(id);
        return { spent: spent };
    }
}
