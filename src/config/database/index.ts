import { PrismaClient } from '@prisma/client';
import config from '../environment';
import { createPrismaQueryEventHandler } from 'prisma-query-log';
import logger from '../../services/logging-service';

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
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'warn' },
    { emit: 'event', level: 'error' },
  ],
  errorFormat: 'pretty',
});

prisma.$on(
  'query',
  createPrismaQueryEventHandler({
    logger: logger.info,
    colorQuery: 'yellow',
    format: true,
    language: 'sql',
  }),
);
prisma.$on('info', ({ message }) => logger.info(message));
prisma.$on('warn', ({ message }) => logger.warn(message));
prisma.$on('error', ({ message }) => logger.error(message));

export default prisma;

export const connectToDatabase = async () => {
  try {
    logger.info('Connecting to database...');
    await prisma.$connect();
    logger.info('Database connection established');
  } catch (error) {
    logger.error('Database connection error', error);
    process.exit(1);
  }
};
