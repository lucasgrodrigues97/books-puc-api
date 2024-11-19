import { FastifyInstance } from 'fastify';
import { knex } from '../db';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { checkSessionId } from '../middlewares/check-session-id';

// http

// controller
// service
// repository

// SOLID

// unit
// integration
// e2e

export async function booksRouter(app: FastifyInstance) {

  app.get(
    '/',
    {
      preHandler: [checkSessionId],
    },
    async (request) => {
      const { sessionId } = request.cookies;

      const books = await knex('books').where('session_id', sessionId).select();

      return { books };
    },
  );

  app.get(
    '/:id',
    {
      preHandler: [checkSessionId],
    },
    async (request) => {
      const { sessionId } = request.cookies;

      const getBookParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getBookParamsSchema.parse(request.params);

      const book = await knex('books')
        .where({
          id,
          session_id: sessionId,
        })
        .first();

      return { book };
    },
  );

  app.post('/', async (request, reply) => {
    const createBookBodySchema = z.object({
      title: z.string(),
      genrer: z.string(),
      author: z.string(),
    });

    const { title, author, genrer } = createBookBodySchema.parse(request.body);

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, //7 days
      });
    }

    await knex('books').insert({
      id: randomUUID(),
      title,
      author,
      genrer,
      session_id: sessionId as string,
    });

    return reply.status(201).send();
  });

  app.put('/:id', () => {
    // Implement PUT route for updating a book
  });

  app.delete('/:id', () => {
    // Implement DELETE route for deleting a book
  });
}
