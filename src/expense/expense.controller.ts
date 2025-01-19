import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { Expense } from './entities/expense.entity';

@Controller('expenses')
@Controller('expenses')
export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService) {}

    @Post()
    async create(@Body() expense: Omit<Expense, 'id'>): Promise<Expense> {
        return this.expenseService.create(expense);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Expense> {
        return this.expenseService.findOne(id);
    }

    @Get('user/:userId')
    async findAllByUserId(@Param('userId') userId: string): Promise<Expense[]> {
        return this.expenseService.findAllByUserId(userId);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updates: Partial<Omit<Expense, 'id' | 'user_id'>>,
    ): Promise<Expense> {
        return this.expenseService.update(id, updates);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.expenseService.remove(id);
    }
}

