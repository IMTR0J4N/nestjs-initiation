import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}