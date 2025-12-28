import {PrismaClient} from "@prisma/client";
import {logger} from "./logging.js";

const isDevelopment = process.env.NODE_ENV !== 'production';

const prismaLogConfig = isDevelopment ? [
    {
        emit: 'event',
        level: 'query',
    },
    {
        emit: 'event',
        level: 'error',
    },
    {
        emit: 'event',
        level: 'info',
    },
    {
        emit: 'event',
        level: 'warn',
    },
] : [
    {
        emit: 'event',
        level: 'error',
    },
    {
        emit: 'event',
        level: 'warn',
    },
];

export const prismaClient = new PrismaClient({
    log: prismaLogConfig,
});

prismaClient.$on('error', (e) => {
    logger.error(e);
});

prismaClient.$on('warn', (e) => {
    logger.warn(e);
});

prismaClient.$on('info', (e) => {
    logger.info(e);
});

prismaClient.$on('query', (e) => {
    logger.info(e);
});
