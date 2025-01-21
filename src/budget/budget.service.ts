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

    // get a budget by ID
    async findOne(id: string): Promise<Budget> {
        const budget = await db('budgets').where({ id }).first();
        if (!budget) {
            throw new Error(`Budget with ID ${id} not found`);
        }
        return budget;
    }

    // Get all budgets for a user
    async findAllByUserId(userId: string): Promise<Budget[]> {
        return await db('budgets').where({ user_id: userId }).select('*');
    }

    // Update a budget
    async update(id: string, updates: Partial<Omit<Budget, 'id' | 'user_id'>>): Promise<Budget> {
        const budget = await db('budgets').where({ id }).first();
        if (!budget) {
            throw new Error(`Budget with ID ${id} not found`);
        }
        await db('budgets').where({ id }).update(updates);
        return this.findOne(id);
    }

    // Delete a budget
    async remove(id: string): Promise<void> {
        const budget = await db('budgets').where({ id }).first();
        if (!budget) {
            throw new Error(`Budget with ID ${id} not found`);
        }
        await db('budgets').where({ id }).delete();
    }

    // Calculate total spent in a budget category during the budget duration
    async calculateSpent(budgetId: string): Promise<number> {
        const budget = await this.findOne(budgetId);
        const { user_id, category, start_date, end_date } = budget;

        const totalSpent = await db('expenses')
            .where('user_id', user_id)
            .andWhere('category', category)
            .andWhereBetween('date', [start_date, end_date])
            .sum('amount');

        return totalSpent[0]["sum(`amount`)"] || 0;
    }
}