import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';

const controller = {
    // [GET] api/parking/
    get_all_parking: async_wrap(async (req, res) => {
        const parkings = await db.Parking.findAll();
        return res.status(200).json(api_response(false, 'Lấy danh sách bãi đỗ xe thành công', parkings));
    }),

    // [POST] api/parking/
    add_parking: async_wrap(async (req, res) => {
        const parking = await db.Parking.create({
            ...req.body,
        });
        await db.Parking_Manager.create({
            User_ID: req.token.id,
            Parking_ID: parking.Parking_ID,
        });
        return res.status(201).json(api_response(false, 'Thêm bãi đỗ xe mới thành công', parking));
    }),

    // [PATCH] api/parking/:id
    update_parking: async_wrap(async (req, res) => {
        const parking = await db.Parking.findByPk(req.params.id);
        if (!parking) return res.status(404).json(api_response(true, 'Không tìm thấy bãi đỗ xe'));
        parking.Parking_Name = req.body.Parking_Name;
        parking.Address = req.body.Address;
        parking.Max_Space = req.body.Max_Space;
        parking.Number_Of_Vehicles = req.body.Number_Of_Vehicles;
        await parking.save();
        return res.status(200).json(api_response(false, 'Cập nhật thông tin bãi đỗ xe thành công'));
    }),

    // [DELETE] api/parking/:id
    delete_parking: async_wrap(async (req, res) => {
        const result = await db.Parking.destroy({
            where: { Parking_ID: req.params.id },
        });

        if (result === 1) return res.status(200).json(api_response(false, 'Xóa bãi đỗ xe thành công'));
        else return res.status(404).json(api_response(true, 'Không tìm thấy bãi đỗ xe'));
    }),
};

export default controller;
