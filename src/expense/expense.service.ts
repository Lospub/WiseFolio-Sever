import { Injectable } from '@nestjs/common';
import knex from 'knex';
import config from '../../knexfile';
import { Expense } from './entities/expense.entity';

const db = knex(config.development);

@Injectable()
export class ExpenseService {
    // Create a new expense
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

    // Get a single expense by ID
    async findOne(id: string): Promise<Expense> {
        const expense = await db('expenses').where({ id }).first();
        if (!expense) {
            throw new Error(`Expense with ID ${id} not found`);
        }
        return expense;
    }

    // Get all expenses for a specific user by user_id
    async findAllByUserId(userId: string): Promise<Expense[]> {
        const userExists = await db('users').where({ id: userId }).first();
        if (!userExists) {
            throw new Error(`User with ID ${userId} does not exist`);
        }

        const expenses = await db('expenses').where({ user_id: userId }).select('*');
        return expenses;
    }

    // Update an expense
    async update(id: string, updates: Partial<Omit<Expense, 'id' | 'user_id'>>): Promise<Expense> {
        const expense = await db('expenses').where({ id }).first();
        if (!expense) {
            throw new Error(`Expense with ID ${id} not found`);
        }

        await db('expenses').where({ id }).update(updates);
        return this.findOne(id);
    }

    // Delete an expense
    async remove(id: string): Promise<void> {
        const expense = await db('expenses').where({ id }).first();
        if (!expense) {
            throw new Error(`Expense with ID ${id} not found`);
        }

        await db('expenses').where({ id }).delete();
    }
}

