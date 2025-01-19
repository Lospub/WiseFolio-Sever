import { Body, Controller, Post } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { Budget } from './entities/budget.entity';

@Controller('budget')
export class BudgetController {
    constructor(private readonly budgetService: BudgetService) {}

    @Post()
    async create(@Body() budget: Omit<Budget, 'id'>): Promise<Budget> {
        return this.budgetService.create(budget);
    }
}
