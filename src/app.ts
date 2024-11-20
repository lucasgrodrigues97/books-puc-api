import fastify from 'fastify';
import { authenticateRoute } from './modules/user/routes/authenticate-route';
import { usersRoute } from './modules/user/routes/user-route';
import { booksRouter } from './routes/books';
import cookies from '@fastify/cookie';
import fastifyJWT from '@fastify/jwt';
import { env } from './env';
import { checkUserAuthentication } from './modules/user/middlewares/check-user-authentication';

export const app = fastify();

// Plugins
app.register(fastifyJWT, { secret: env.SECRET_KEY });
app.register(cookies);

// Decorators
app.decorate('authenticate', checkUserAuthentication);

// Routes
app.addHook('preHandler', async (req) => { req.jwt = app.jwt });
app.register(authenticateRoute, {prefix: '/authenticate'});
app.register(usersRoute, {prefix: '/users'});
app.register(booksRouter, {prefix: '/books'});
