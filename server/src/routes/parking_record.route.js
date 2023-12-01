import express from 'express';
import mdw from '../middlewares/auth.middleware.js';
import ctrl from '../controllers/parking_record.controller.js';

const route = express.Router();

route.get('/', mdw.verify_admin, ctrl.get_all_parking_record);
route.post('/', mdw.verify_manager, ctrl.add_parking_record);

export default route;
