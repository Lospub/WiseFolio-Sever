import { Injectable } from '@nestjs/common';
import knex from 'knex';
import config from '../../knexfile';
import { Expense } from './entities/expense.entity';

const db = knex(config.development);

@Injectable()
export class ExpenseService {

    // create a new expense
    async create(expense: Omit<Expense, 'id'>): Promise<Expense> {
        const userExists = await db('users').where({ id: expense.user_id }).first();
        
        if (!userExists) {
            throw new Error(`User with ID ${expense.user_id} does not exist`);
        }

        const id = crypto.randomUUID();
        const newExpense = { ...expense, id };
        await db('expenses').insert(newExpense);
        return newExpense;
    }
}
