import { Injectable } from '@nestjs/common';
import knex from 'knex';
import config from '../../knexfile';
import { Saving } from './entities/saving.entity';

const db = knex(config.development);

@Injectable()
export class SavingService {

    // Create a new saving
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

}
