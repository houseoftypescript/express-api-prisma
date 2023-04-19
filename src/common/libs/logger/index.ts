import pino, { Logger } from 'pino';
import pretty from 'pino-pretty';

const stream = pretty({ colorize: true });
const logger: Logger = pino(stream);

export default logger;
