import { PrismaClient } from '@prisma/client';
import config from '../environment';
import { createPrismaQueryEventHandler } from 'prisma-query-log';

const {
  database: { database, port, host, user, password },
} = config;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `postgresql://${user}:${password}@${host}:${port}/${database}`,
    },
  },
  log: [
    {
      level: 'query',
      emit: 'event',
    },
  ],
});

const log = createPrismaQueryEventHandler({
  logger: console.log,
  colorQuery: 'yellow',
  format: true,
  language: 'sql',
});

prisma.$on('query', log);

export default prisma;

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};
