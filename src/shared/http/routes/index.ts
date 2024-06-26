import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import balconistsRouter from '@modules/balconist/routes/balconists.routes';
import adminsRouter from '@modules/admins/routes/admins.routes';
import ordersRouter from '@modules/orders/routes/orders.routes';
import balconistsSessionsRouter from '@modules/balconist/routes/balconists.sessions.routes';
import adminsSessionsRouter from '@modules/admins/routes/admins.sessions.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/balconists', balconistsRouter);
routes.use('/admins', adminsRouter);
routes.use('/orders', ordersRouter);
routes.use('/sessions', balconistsSessionsRouter);
routes.use('/sessions', adminsSessionsRouter);

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello friend!' });
});

export default routes;
