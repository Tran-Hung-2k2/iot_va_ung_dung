import express from 'express';
import { validate } from 'express-validation';
import vld from '../validations/parking_manager.validation.js';
import mdw from '../middlewares/auth.middleware.js';
import ctrl from '../controllers/parking_manager.controller.js';

const route = express.Router();

route
    .route('/')
    .get(mdw.verify_admin, ctrl.get_all_parking_manager)
    .post(validate(vld.add_parking_manager()), mdw.verify_admin, ctrl.add_parking_manager);

route
    .route('/:user_id/:parking_id')
    .patch(validate(vld.update_parking_manager()), mdw.verify_admin_and_manager, ctrl.update_parking_manager)
    .delete(mdw.verify_admin, ctrl.delete_parking_manager);

export default route;
