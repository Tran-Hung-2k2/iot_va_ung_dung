import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';

const controller = {
    // [GET] /api/parking_manager/
    get_all_parking_manager: async_wrap(async (req, res) => {
        const parking_managers = await db.Parking_Manager.findAll();
        return res
            .status(200)
            .json(api_response(false, 'Lấy danh sách quản lý bãi đỗ xe thành công', parking_managers));
    }),

    // [POST] /api/parking_manager/
    add_parking_manager: async_wrap(async (req, res) => {
        const parking_manager = await db.Parking_Manager.create({
            User_ID: req.body.User_ID,
            Parking_ID: req.body.Parking_ID,
        });
        return res.status(201).json(api_response(false, 'Thêm quản lý bãi đỗ xe mới thành công', parking_manager));
    }),

    // [PATCH] /api/parking_manager/:user_id/:parking_id
    update_parking_manager: async_wrap(async (req, res) => {
        const parking_managers = await db.Parking_Manager.findAll({
            where: {
                [db.Sequelize.Op.or]: [{ User_ID: req.params.user_id }, { Parking_ID: req.params.parking_id }],
            },
        });
        const has_manager = parking_managers.some((manager) => manager.Is_Managing === true);
        if (has_manager && req.body.Is_Managing == true) {
            return res
                .status(400)
                .json(
                    api_response(
                        true,
                        'Bạn đang quản lý 1 bãi đỗ xe hoặc bãi đỗ xe này đã có người khác đang quản lý. Vui lòng thử lại sau.',
                    ),
                );
        }

        const manager = await db.User.findByPk(req.token.id);
        const parking_manager = await db.Parking_Manager.findOne({
            where: { User_ID: req.params.user_id, Parking_ID: req.params.parking_id },
        });

        if (manager.User_ID != parking_manager.User_ID && manager.Role != 'admin')
            return res
                .status(400)
                .json(
                    api_response(true, 'Bạn không có quyền sửa đổi thông tin quản lý bãi đỗ xe của người quản lý khác'),
                );
        if (manager.User_ID == parking_manager.User_ID && manager.Role == 'admin')
            return res.status(400).json(api_response(true, 'Admin không có quyền cho phép xe ra vào'));

        parking_manager.Is_Managing = req.body.Is_Managing;
        await parking_manager.save();

        return res.status(200).json(api_response(false, 'Cập nhật thông tin quản lý bãi đỗ xe thành công'));
    }),

    // [DELETE] /api/parking_manager/:user_id/:parking_id
    delete_parking_manager: async_wrap(async (req, res) => {
        const result = await db.Parking_Manager.destroy({
            where: { User_ID: req.params.user_id, Parking_ID: req.params.parking_id },
        });

        if (result === 1) return res.status(200).json(api_response(false, 'Xóa quản lý bãi đỗ xe thành công'));
        else return res.status(404).json(api_response(true, 'Không tìm thấy quản lý bãi đỗ xe'));
    }),
};

export default controller;
