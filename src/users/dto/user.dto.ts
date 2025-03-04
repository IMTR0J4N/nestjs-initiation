import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
        message: 'Invalid role. Must be one of the following values: INTERN, ENGINEER, ADMIN'
    })
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}