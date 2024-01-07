import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';
import APIError from '../utils/api_error.js';

const controller = {
    // [GET] /api/parking/
    get_all_parking: async_wrap(async (req, res) => {
        const queryParams = ['Parking_ID'];
        const whereClause = {};

        queryParams.forEach((param) => {
            if (req.query[param]) {
                whereClause[param] = req.query[param];
            }
        });

        const parkings = await db.Parking.findAll({ where: whereClause });

        if (parkings.length > 0)
            return res.status(200).json(api_response(false, 'Lấy danh sách bãi đỗ xe thành công', parkings));
        else return res.status(200).json(api_response(false, 'Không tìm thấy bãi đỗ xe nào', parkings));
    }),

    // [POST] /api/parking/
    add_parking: async_wrap(async (req, res) => {
        const parking = await db.Parking.create({
            ...req.body,
        });

        return res.status(201).json(api_response(false, 'Thêm bãi đỗ xe mới thành công', parking));
    }),

    // [PATCH] /api/parking/:id
    update_parking: async_wrap(async (req, res) => {
        const parking = await db.Parking.findByPk(req.params.id);
        if (!parking) throw new APIError(404, 'Không tìm thấy bãi đỗ xe');

        parking.Name = req.body.Name;
        parking.Address = req.body.Address;
        parking.Max_Space = req.body.Max_Space;
        parking.Charge = req.body.Charge;
        parking.Number_Of_Vehicles = req.body.Number_Of_Vehicles;
        await parking.save();
        return res.status(200).json(api_response(false, 'Cập nhật thông tin bãi đỗ xe thành công', parking));
    }),

    // [PATCH] /api/parking/num_of_vehicles/:id
    update_number_of_vehicles: async_wrap(async (req, res) => {
        const parking = await db.Parking.findByPk(req.params.id);
        if (!parking) throw new APIError(404, 'Không tìm thấy bãi đỗ xe');
        const new_count = parking.Number_Of_Vehicles + req.body.Number_Of_Vehicles;

        if (new_count < 0) throw new APIError(400, 'Cập nhật thất bại do số lượng xe trong bãi nhỏ hơn 0');
        else parking.Number_Of_Vehicles = new_count;
        await parking.save();
        return res
            .status(200)
            .json(api_response(false, 'Cập nhật thông tin số lượng xe trong bãi thành công', parking));
    }),

    // [DELETE] /api/parking/:id
    delete_parking: async_wrap(async (req, res) => {
        const result = await db.Parking.destroy({
            where: { Parking_ID: req.params.id },
        });

        if (result === 1) return res.status(200).json(api_response(false, 'Xóa bãi đỗ xe thành công'));
        else throw new APIError(404, 'Không tìm thấy bãi đỗ xe');
    }),
};

export default controller;
