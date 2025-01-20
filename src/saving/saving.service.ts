import { Injectable } from '@nestjs/common';
import knex from 'knex';
import config from '../../knexfile';
import { Saving } from './entities/saving.entity';

const db = knex(config.development);

@Injectable()
export class SavingService {

    // Create a new saving goal
    async create(saving: Omit<Saving, 'id'>): Promise<Saving> {
        const userExists = await db('users').where({ id: saving.user_id }).first();
        if (!userExists) {
            throw new Error(`User with ID ${saving.user_id} does not exist`);
        }

        const id = crypto.randomUUID();
        const newSaving = { ...saving, id };
        await db('savings').insert(newSaving);
        return newSaving;
    }

    // Get a saving goal by ID
    async findOne(id: string): Promise<Saving> {
        const saving = await db('savings').where({ id }).first();
        if (!saving) {
            throw new Error(`Saving Goal with ID ${id} not found`);
        }
        return saving;
    }

    // Get all saving goals for a user
    async findAllByUserId(userId: string): Promise<Saving[]> {
        return await db('savings').where({ user_id: userId }).select('*');
    }

    // Update a saving goal
    async update(id: string, updates: Partial<Omit<Saving, 'id' | 'user_id'>>): Promise<Saving> {
        const saving = await db('savings').where({ id }).first();
        if (!saving) {
            throw new Error(`Saving Goal with ID ${id} not found`);
        }
        await db('savings').where({ id }).update(updates);
        return this.findOne(id);
    }

    // Delete a saving goal
    async remove(id: string): Promise<void> {
        const saving = await db('savings').where({ id }).first();
        if (!saving) {
            throw new Error(`Saving Goal with ID ${id} not found`);
        }
        await db('savings').where({ id }).delete();
    }
}
