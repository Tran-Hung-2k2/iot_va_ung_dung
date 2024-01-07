import express from 'express';
import { validate } from 'express-validation';
import vld from '../validations/auth.validation.js';
import ctrl from '../controllers/auth.controller.js';
import mdw from '../middlewares/auth.middleware.js';

const route = express.Router();

route.post('/register', validate(vld.register()), ctrl.register);
route.post('/verify_register', validate(vld.verify_register()), ctrl.verify_register);
route.post('/login', validate(vld.login()), ctrl.login);
route.post('/change_password', validate(vld.change_password()), mdw.verify_all_user, ctrl.change_password);
route.post('/forget_password', validate(vld.forget_password()), ctrl.forget_password);
route.post('/verify_forget_password', validate(vld.verify_forget_password()), ctrl.verify_forget_password);
route.post('/logout', ctrl.logout);
route.post('/refresh_token', validate(vld.refresh_token()), ctrl.refresh_token);

export default route;
