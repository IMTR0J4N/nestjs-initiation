import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {

    /**
     * TODO:
        * PATCH /users/:id
        * DELETE /users/:id
     */

    @Get() // 👈 GET /users or /users?role=value
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return [];
    }

    @Get(':id') // 👈 GET /users/:id
    findOne(@Param('id') id: string) {
        return { id };
    }

    @Post() // 👈 POST /users
    create(@Body() user: {}) {
        return user;
    }

    @Patch(':id') // 👈 PATCH /users/:id
    update(@Param('id') id: string, @Body() userUpdate: {}) {
        return { id, ...userUpdate };
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return { id };
    }
}
