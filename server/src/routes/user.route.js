import express from 'express';
import { validate } from 'express-validation';
import vld from '../validations/user.validation.js';
import ctrl from '../controllers/user.controller.js';
import ms from '../services/multer.service.js';
import mdw from '../middlewares/auth.middleware.js';

const route = express.Router();

route.get('/', validate(vld.get_all_users()), mdw.verify_admin, ctrl.get_all_users);
route.get('/detail', mdw.verify_all_user, ctrl.get_user_info);
route.post('/add', validate(vld.add_manager()), mdw.verify_admin, ctrl.add_manager);
route.patch(
    '/detail',
    ms.upload.single('Avatar'),
    validate(vld.update_user_detail()),
    mdw.verify_all_user,
    ctrl.update_user_detail,
);
route.patch('/balance', validate(vld.add_balance()), mdw.verify_admin, ctrl.add_balance);
route.patch('/:id', validate(vld.update_user()), mdw.verify_admin, ctrl.update_user);
route.delete('/:id', validate(vld.delete_user()), mdw.verify_admin, ctrl.delete_user);

export default route;
