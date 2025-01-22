import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    async create(@Body('name') name: string): Promise<Category> {
        return this.categoryService.create(name);
    }

    @Get()
    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Category> {
        return this.categoryService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body('name') name: string,
    ): Promise<Category> {
        return this.categoryService.update(id, name);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.categoryService.remove(id);
    }
}
