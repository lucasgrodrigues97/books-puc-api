import fastify from 'fastify';
import { usersRoute } from './modules/user/routes/user-route';
import { booksRouter } from './routes/books';
import cookies from '@fastify/cookie';

export const app = fastify();

app.register(cookies);

// Routes
app.register(usersRoute, {prefix: '/users'});
app.register(booksRouter, {prefix: '/books'});
