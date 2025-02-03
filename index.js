import express from 'express';
import routerApi from './routes/index.js';
import corsConfig from './config/corsConfig.js';
import morgan from 'morgan';
import helmet from 'helmet';
import slash from 'express-slash'
import { errorHandler, logErrors, boomErrorHandler } from './middleware/error.handler.js';

const app = express();
const port = 3000;
app.use(express.json());
app.use(corsConfig);
app.use(helmet());
app.use(morgan('tiny'));
/* TODO INTEGRATE PASSPORT */

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

// Add the `slash()` middleware after your app's `router`, optionally specify
// an HTTP status code to use when redirecting (defaults to 301).
routerApi(app);
app.use(slash());


//Los errores se ejecutan de arriba hacía abajo
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port' + port);
});
