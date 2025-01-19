import { Injectable } from '@nestjs/common';
import knex from 'knex';
import config from '../../knexfile';
import { Budget } from './entities/budget.entity';

const db = knex(config.development);

@Injectable()
export class BudgetService {
    
    // Create a new budget
    async create(budget: Omit<Budget, 'id'>): Promise<Budget> {
        const userExists = await db('users').where({ id: budget.user_id }).first();
        if (!userExists) {
            throw new Error(`User with ID ${budget.user_id} does not exist`);
        }

        const id = crypto.randomUUID();
        const newBudget = { ...budget, id };
        await db('budgets').insert(newBudget);
        return newBudget;
    }
}