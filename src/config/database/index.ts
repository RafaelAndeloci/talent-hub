import { PrismaClient } from '@prisma/client';
import config from '../environment';

const {
  database: { database, port, host, user, password },
} = config;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `postgresql://${user}:${password}@${host}:${port}/${database}`,
    },
  },
  log: ['query', 'info', 'warn', 'error'],
});

export default prisma;