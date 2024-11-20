import { CreateUserDTO } from "../dtos/create-user-dto";
import { IUserRepository } from '../interfaces/IUserRepository';
import { User } from "../entities/User";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

class UserService {

    constructor(private userRepository: IUserRepository) {}

    async create({ name, email, password }: CreateUserDTO): Promise<User> {

        const checkUserExists = await this.userRepository.findByEmail(email);

        if (checkUserExists) {

            throw new Error('Email already in use');
        }

        const hash = await bcrypt.hash(password, SALT_ROUNDS);

        return await this.userRepository.create({ name, email, password: hash});
    }
}

export default UserService;
