import express from 'express';
import { validate } from 'express-validation';
import vld from '../validations/parking_record.validation.js';
import mdw from '../middlewares/auth.middleware.js';
import ctrl from '../controllers/parking_record.controller.js';
import ms from '../services/multer.service.js';

const route = express.Router();

route.get('/', mdw.verify_all_user, ctrl.get_all_parking_record);
route.get('/lastest', validate(vld.get_lastest_record()), mdw.verify_manager, ctrl.get_lastest_record);
route.post(
    '/',
    ms.upload.single('Image'),
    validate(vld.add_parking_record()),
    mdw.verify_manager,
    ctrl.add_parking_record,
);

export default route;
