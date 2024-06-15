import { Router } from 'express';
import AdminsController from '../controllers/AdminsController';
import { celebrate, Joi, Segments } from 'celebrate';
//import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
//import PhotosController from '../controllers/PhotosController';
//import multer from 'multer';
//import uploadConfig from '@config/upload';

const adminsRouter = Router();
const adminsController = new AdminsController();

adminsRouter.get('/', adminsController.index);
adminsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      registration_number: Joi.number().required(),
      password: Joi.string().required(),
    },
  }),
  adminsController.create,
);
adminsRouter.put(
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
  adminsController.update,
);
adminsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  adminsController.show,
);
adminsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  adminsController.delete,
);

export default adminsRouter;
