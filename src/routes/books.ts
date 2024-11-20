import { FastifyInstance } from 'fastify';
import { knex } from '../db';
import { z } from 'zod';
import { randomUUID } from 'crypto';

export async function booksRouter(app: FastifyInstance) {

  app.get(
    '/',
    {
      preHandler: [app.authenticate],
    },
    async (request) => {

      const { id } = request.user;

      const books = await knex('books').where('user_id', id).select();

      return { books };
    },
  );

  app.get(
    '/:id',
    {
      preHandler: [app.authenticate],
    },
    async (request) => {
      const { id: user_id } = request.user;

      const getBookParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getBookParamsSchema.parse(request.params);

      const book = await knex('books')
        .where({
          id,
          user_id,
        })
        .first();

      return { book };
    },
  );

  app.post(
    '/',
    {
      preHandler: [app.authenticate],
    },
    async (request, reply) => {
      
      const createBookBodySchema = z.object({
        title: z.string(),
        genrer: z.string(),
        author: z.string(),
      });

      const { title, author, genrer } = createBookBodySchema.parse(request.body);

      await knex('books').insert({
        id: randomUUID(),
        title,
        author,
        genrer,
        user_id: request.user.id,
      });

      return reply.status(201).send();
  });

  app.put(
    '/:id',
    {
      preHandler: [app.authenticate],
    },
    async (request, reply) => {
      
      const createBookBodySchema = z.object({
        title: z.string(),
        genrer: z.string(),
        author: z.string(),
      });

      const { title, author, genrer } = createBookBodySchema.parse(request.body);

      const getBookParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getBookParamsSchema.parse(request.params);

      const book = await knex('books')
            .update({title, genrer, author})
            .where({id})
            .returning(['id', 'title', 'genrer', 'author']);

      return reply.status(201).send(book);
  });

  app.delete(
    '/:id',
    {
      preHandler: [app.authenticate],
    },
    async (request, reply) => {

      const getBookParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getBookParamsSchema.parse(request.params);

      await knex('books').delete().where({id});

      return reply.status(201).send({'Status': 'Successfully deleted'});
  });
}
