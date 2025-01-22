import { Injectable } from '@nestjs/common';
import knex from 'knex';
import config from '../../knexfile';
import { Category } from './entities/category.entity';

const db = knex(config.development);

@Injectable()
export class CategoryService {
    // Create a new category
    async create(name: string): Promise<Category> {
        // Check if the category already exists
        const existingCategory = await db('categories').where({ name }).first();
        if (existingCategory) {
            throw new Error(`Category "${name}" already exists.`);
        }

        const id = crypto.randomUUID();
        const newCategory = { id, name };

        await db('categories').insert(newCategory);
        return newCategory;
    }

    // Get all categories
    async findAll(): Promise<Category[]> {
        return await db('categories').select('*');
    }

    // Get a category by ID
    async findOne(id: string): Promise<Category> {
        const category = await db('categories').where({ id }).first();
        if (!category) {
            throw new Error(`Category with ID ${id} not found.`);
        }
        return category;
    }

    // Update a category
    async update(id: string, name: string): Promise<Category> {
        const category = await db('categories').where({ id }).first();
        if (!category) {
            throw new Error(`Category with ID ${id} not found.`);
        }

        // Check if the new name already exists
        const existingCategory = await db('categories').where({ name }).first();
        if (existingCategory && existingCategory.id !== id) {
            throw new Error(`Category "${name}" already exists.`);
        }

        await db('categories').where({ id }).update({ name });
        return this.findOne(id);
    }


    // Delete a category
    async remove(id: string): Promise<void> {
        const category = await db('categories').where({ id }).first();
        if (!category) {
            throw new Error(`Category with ID ${id} not found.`);
        }
        await db('categories').where({ id }).delete();
    }
}
