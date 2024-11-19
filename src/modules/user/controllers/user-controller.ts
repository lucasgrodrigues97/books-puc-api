import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import UserService from "../services/user-service";

class UserController {

    async create (request: FastifyRequest, reply: FastifyReply) {

        const createUserSchema = z.object({
            name: z.string(),
            email: z.string().email({}),
            password: z.string().min(6),
        });

        const { name, email, password } = createUserSchema.parse(request.body);

        const userService = new UserService();

        const user = await userService.create({ name, email, password });
    }
}

export default UserController;