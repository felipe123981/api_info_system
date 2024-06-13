import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import balconistsRouter from '@modules/balconist/routes/balconists.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/balconists', balconistsRouter);

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello friend!' });
});

export default routes;
