import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../../auth.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @UseGuards(AuthGuard)
    findAll() {
        return this.userService.findAll();
    }

    @Post()
    createUser(@Body() body: { email: string; name: string }) {
        return this.userService.createUser(body.email, body.name);
    }
}
