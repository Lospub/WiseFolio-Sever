import { Injectable } from '@nestjs/common';
import knex from 'knex';
import config from '../../knexfile';

const db = knex(config.development);

@Injectable()
export class UserService {
    async findAll() {
        return await db('users').select('*');
    }

    async createUser(email: string, name: string) {
        return await db('users').insert({ email, name });
    }
}
