import express from 'express';
import { validate } from 'express-validation';
import vld from '../validations/parking_card.validation.js';
import mdw from '../middlewares/auth.middleware.js';
import ctrl from '../controllers/parking_card.controller.js';

const route = express.Router();

route
    .route('/')
    .get(mdw.verify_admin, ctrl.get_all_parking_card)
    .post(validate(vld.add_parking_card()), mdw.verify_admin, ctrl.add_parking_card);

route
    .route('/:id')
    .get(mdw.verify_all_user, ctrl.get_parking_card_by_id)
    .patch(validate(vld.update_parking_card()), mdw.verify_admin, ctrl.update_parking_card)
    .delete(mdw.verify_admin, ctrl.delete_parking_card);

route
    .route('/user/:id')
    .get(validate(vld.get_parking_card_by_user()), mdw.verify_admin_and_user, ctrl.get_parking_card_by_user);

export default route;
