import { Body, Controller, Post } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { Expense } from './entities/expense.entity';

@Controller('expenses')
export class ExpenseController {
    constructor(private readonly expenseService:ExpenseService) {}

    @Post()
    async create(@Body() expense: Omit<Expense, 'id'>): Promise<Expense> {
        return this.expenseService.create(expense);
    }
}
