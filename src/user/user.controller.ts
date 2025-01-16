import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    async signUp(@Body() body: { email: string; name: string; password: string }) {
        return this.userService.signUp(body.email, body.name, body.password);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return { idToken: await this.userService.login(body.email, body.password) };
    }

    @Get('get-by-email')
    async getUserByEmail(@Query('email') email: string) {
        return this.userService.getUserByEmail(email);
    }
}
