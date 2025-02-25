import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import './database/index.js';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Tamanho configurado no express e no nginx
    this.server.use(express.json({ limit: '100mb' }));
  }

  routes() {
    this.server.use(cors());
    this.server.use(routes);
  }

  start(port) {
    this.server.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  }
}

const app = new App();

app.start(2402);

export default app.server;