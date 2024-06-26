import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
//import multer from 'multer';
//import uploadConfig from '@config/upload';
import AdminsSessionsController from '../controllers/AdminsSessionsController';
//import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
//import UserAvatarController from '../controllers/UserAvatarController';

const adminsSessionsRouter = Router();
const sessionsController = new AdminsSessionsController();
//const usersAvatarController = new UserAvatarController();

//const upload = multer(uploadConfig);


adminsSessionsRouter.post(
  '/admins',
  celebrate({
    [Segments.BODY]: {
      registration_number: Joi.number().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default adminsSessionsRouter;
