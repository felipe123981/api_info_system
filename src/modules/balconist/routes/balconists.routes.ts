import { Router } from 'express';
import BalconistsController from '../controllers/BalconistsController';
import { celebrate, Joi, Segments } from 'celebrate';
//import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
//import PhotosController from '../controllers/PhotosController';
//import multer from 'multer';
//import uploadConfig from '@config/upload';

const balconistsRouter = Router();
const balconistsController = new BalconistsController();

balconistsRouter.get('/', balconistsController.index);
balconistsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      registration_number: Joi.number().required(),
      password: Joi.string().required(),
    },
  }),
  balconistsController.create,
);
balconistsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      registration_number: Joi.number().required(),
      password: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  balconistsController.update,
);
balconistsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  balconistsController.show,
);
balconistsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  balconistsController.delete,
);

export default balconistsRouter;
