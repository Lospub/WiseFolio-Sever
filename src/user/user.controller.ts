import { Controller, Post, Get, Put, Body, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

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

    @Get(':id')
    async findUserById(@Param('id') id: string) {
        return this.userService.findUserById(id);
    }

    @Put('update')
    async updateUser(@Body() body: { userId: string; newName?: string; newPassword?: string }) {
        return this.userService.updateUser(body.userId, body.newName, body.newPassword);
    }

    @Post('decode-token')
    async decodeIdToken(@Body('idToken') idToken: string) {
        return this.userService.decodeIdToken(idToken);
    }
}
