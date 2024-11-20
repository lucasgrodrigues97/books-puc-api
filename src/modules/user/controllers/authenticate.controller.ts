import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import AuthenticateUserService from "../services/authenticate-user.service";
import UserRepository from "../repositories/user-repository";

class AuthenticateController {

    async authenticate(request: FastifyRequest, reply: FastifyReply) {

        const authenticateSchema = z.object({
            email: z.string().email(),
            password: z.string().min(6),
        });

        const { email, password } = authenticateSchema.parse(request.body);

        const authenticateUserService = new AuthenticateUserService(new UserRepository, request.jwt);

        const token = await authenticateUserService.authenticate({ email, password });

        reply.cookie('access_token', token, { path: '/', httpOnly: true, secure: true });

        return { accessToken: token };
    }
}

export default AuthenticateController;
