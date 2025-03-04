import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'INTERN',
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'ENGINEER',
        },
        {
            id: 3,
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            role: 'ADMIN',
        },
        {
            id: 4,
            name: 'Bob Brown',
            email: 'bob.brown@example.com',
            role: 'ENGINEER',
        },
        {
            id: 5,
            name: 'Charlie Davis',
            email: 'charlie.davis@example.com',
            role: 'INTERN',
        }
    ];

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role);
        }

        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);

        return user;
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);

        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto,
        }

        this.users.push(newUser);

        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {
                    ...user,
                    ...updateUserDto,
                }
            }

            return user;
        })

        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);

        this.users = this.users.filter(user => user.id !== id);

        return removedUser;
    }
}
