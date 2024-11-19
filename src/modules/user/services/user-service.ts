import knex from "knex";
import { CreateUserDTO } from "../dtos/create-user-dto";
import { User } from "../entities/User";
import { randomUUID } from "crypto";

class UserService {

    async create({ name, email, password }: CreateUserDTO): Promise<User> {

        const user = await knex('users').insert({
            id: randomUUID,
            name,
            email,
            password
        }).returning(['id', 'name', 'email', 'created_at']);

        return user[0] as User;
    }
}

export default UserService;
