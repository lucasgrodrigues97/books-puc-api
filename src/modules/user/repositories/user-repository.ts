import { CreateUserDTO } from "../dtos/create-user-dto";
import { User } from "../entities/User";
import { IUserRepository } from "../interfaces/IUserRepository";
import { randomUUID } from "crypto";
import { knex } from '../../../db';

class UserRepository implements IUserRepository {

    async create({ name, email, password }: CreateUserDTO): Promise<User> {

        const user = await knex('users').insert({
            id: randomUUID(),
            name,
            email,
            password
        }).returning(['id', 'name', 'email', 'created_at']);

        return user[0] as User;
    }

    async findByEmail(email: string): Promise<User|undefined> {

        return await knex('users').where('email', email).first();
    }
}

export default UserRepository;