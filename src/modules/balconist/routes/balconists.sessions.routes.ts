import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
//import multer from 'multer';
//import uploadConfig from '@config/upload';
import BalconistsSessionsController from '../controllers/BalconistsSessionsController';
//import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
//import UserAvatarController from '../controllers/UserAvatarController';

const balconistsSessionsRouter = Router();
const sessionsController = new BalconistsSessionsController();
//const usersAvatarController = new UserAvatarController();

//const upload = multer(uploadConfig);


balconistsSessionsRouter.post(
  '/balconists',
  celebrate({
    [Segments.BODY]: {
      registration_number: Joi.number().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default balconistsSessionsRouter;
