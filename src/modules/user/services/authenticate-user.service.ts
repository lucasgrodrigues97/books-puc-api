import { AuthenticateUserDTO } from "../dtos/authenticate-user.dto";
import { IUserRepository } from '../interfaces/IUserRepository';
import { User } from "../entities/User";
import bcrypt from 'bcrypt';
import { JWT } from "@fastify/jwt";

class AuthenticateUserService {

    constructor(
        private userRepository: IUserRepository,
        private jwt: JWT
    ) {}

    async authenticate({ email, password }: AuthenticateUserDTO): Promise<string> {

        const user = await this.userRepository.findByEmail(email);

        const isMatch = user && (await bcrypt.compare(password, user.password));

        if (!isMatch) {

            throw new Error('Invalid email or password');
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        const token = this.jwt.sign(payload);

        return token;
    }
}

export default AuthenticateUserService;
