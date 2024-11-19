import { knex } from 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    books: {
      id: string;
      user_id: string;
      title: string;
      author: string;
      genrer: string;
      created_at: Date;
      session_id?: string;
    };
  }

  export interface Tables {
    users: {
      id: string;
      name: string;
      email: string;
      password: string;
      created_at: Date;
    };
  }
}
