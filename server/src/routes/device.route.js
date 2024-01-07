import express from 'express';
import { validate } from 'express-validation';
import vld from '../validations/device.validation.js';
import mdw from '../middlewares/auth.middleware.js';
import ctrl from '../controllers/device.controller.js';

const route = express.Router();

route
    .route('/')
    .get(validate(vld.get_all_device()), mdw.verify_admin_and_manager, ctrl.get_all_device)
    .post(validate(vld.add_device()), mdw.verify_admin, ctrl.add_device);

route
    .route('/:id')
    .patch(validate(vld.update_device()), mdw.verify_admin, ctrl.update_device)
    .delete(validate(vld.delete_device()),mdw.verify_admin, ctrl.delete_device);

export default route;
