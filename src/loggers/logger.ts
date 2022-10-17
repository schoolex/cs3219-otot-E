import pino from 'pino';
import morgan from 'morgan';
import chalk from 'chalk';

// pino logger is used for regular logging
export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      levelFirst: true,
      translateTime: 'SYS:dd-mm-yyyy h:MM:ss TT',
    },
  },
});

// Format date and time for morgan
morgan.token('date', () => new Date().toUTCString().split(' GMT')[0].split(', ')[1]);

export const httpLogger = morgan((tokens, req, res) =>
  [
    chalk.white(`[${tokens.date(req, res)}]`),
    chalk.yellow.bold(tokens.method(req, res)),
    chalk.yellow.bold(tokens.status(req, res)),
    chalk.hex('#ff5252')(tokens.url(req, res)),
    chalk.hex('#2ed573')(`${tokens['response-time'](req, res)} ms`),
    chalk.gray(tokens['user-agent'](req, res)),
  ].join(' '),
);
