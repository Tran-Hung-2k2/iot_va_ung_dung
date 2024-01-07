import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';
import APIError from '../utils/api_error.js';

const controller = {
    // [GET] /api/device/
    get_all_device: async_wrap(async (req, res) => {
        const queryParams = ['Device_ID', 'Parking_ID'];
        const whereClause = {};

        queryParams.forEach((param) => {
            if (req.query[param]) {
                whereClause[param] = req.query[param];
            }
        });

        const data = await db.Device.findAll({
            where: whereClause,
            include: [
                {
                    model: db.Parking,
                },
            ],
        });

        return res.status(200).json(api_response(false, 'Lấy danh sách thiết bị thành công', data));
    }),

    // [POST] /api/device/
    add_device: async_wrap(async (req, res) => {
        const parking = db.Parking.findByPk(req.body.Parking_ID);
        if (!parking) throw new APIError(404, 'Không tìm thấy thiết bị');
        const device = await db.Device.create({
            ...req.body,
        });

        return res.status(201).json(api_response(false, 'Thêm thiết bị mới thành công', device));
    }),

    // [PATCH] /api/device/:id
    update_device: async_wrap(async (req, res) => {
        const device = await db.Device.findByPk(req.params.id);
        if (!device) throw new APIError(404, 'Không tìm thấy thiết bị');

        device.Name = req.body.Name;
        device.Parking_ID = req.body.Parking_ID;
        await device.save();
        return res.status(200).json(api_response(false, 'Cập nhật thông tin thiết bị thành công', device));
    }),

    // [DELETE] /api/device/:id
    delete_device: async_wrap(async (req, res) => {
        const result = await db.Device.destroy({
            where: { Device_ID: req.params.id },
        });

        if (result === 1) return res.status(200).json(api_response(false, 'Xóa thiết bị thành công'));
        else throw new APIError(404, 'Không tìm thấy thiết bị');
    }),
};

export default controller;
