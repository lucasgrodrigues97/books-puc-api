import { FastifyInstance } from "fastify";
import AuthenticateController from "../controllers/authenticate.controller";

const autheticateController = new AuthenticateController();

export async function authenticateRoute(app: FastifyInstance) {

    app.post('/', autheticateController.authenticate);
}
