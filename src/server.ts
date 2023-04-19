import http from 'http';
import { HttpError } from 'http-errors';
import app from './app';
import logger from './common/libs/logger';

const normalizePort = (val: string): string | number | boolean => {
  const portOrPipe = parseInt(val, 10);

  if (isNaN(portOrPipe)) {
    // named pipe
    return val;
  }

  if (portOrPipe >= 0) {
    // port number
    return portOrPipe;
  }

  return false;
};

const main = async () => {
  // Port
  const port = normalizePort(process.env.PORT || '8080');
  app.set('port', port);
  const httpServer = http.createServer(app);
  // HTTP Server
  httpServer.listen(port);
  httpServer.on('listening', () => {
    const address = httpServer.address();
    const bind =
      typeof address === 'string' ? 'pipe ' + address : 'port ' + address?.port;
    logger.info(`🚀 Server is listening on ${bind}`);
  });

  httpServer.on('error', (error: HttpError) => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    if (error.code === 'EACCES') {
      logger.error(`${bind} requires elevated privileges`);
    }
    if (error.code === 'EADDRINUSE') {
      logger.error(`${bind} is already in use`);
    }
    process.exit(1);
  });
};

main().catch((error: Error) => logger.error(`main error ${error}`));

process.on('unhandledRejection', (reason: string) => {
  throw new Error(`unhandledRejection ${reason}`);
});

process.on('uncaughtException', (error: Error) => {
  logger.error(`uncaughtException ${error}`);
  process.exit(1);
});
