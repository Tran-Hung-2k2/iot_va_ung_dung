import label from '../constants/label.js';
import db from '../models/index.js';
import APIError from '../utils/api_error.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';

const controller = {
    // [GET] /api/parking_manager/
    get_all_parking_manager: async_wrap(async (req, res) => {
        const parking_managers = await db.Parking.findAll({
            include: [
                {
                    model: db.Parking_Manager,
                    include: [
                        {
                            model: db.User,
                            attributes: ['User_ID', 'Name', 'Avatar', 'Email'],
                        },
                    ],
                },
            ],
        });
        return res
            .status(200)
            .json(api_response(false, 'Lấy danh sách quản lý bãi đỗ xe thành công', parking_managers));
    }),

    // [GET] /api/parking_manager/manager
    get_parking_manager_by_manager: async_wrap(async (req, res) => {
        const queryParams = ['Parking_ID'];
        const whereClause = {};

        queryParams.forEach((param) => {
            if (req.query[param]) {
                whereClause[param] = req.query[param];
            }
        });

        const parking_managers = await db.Parking.findAll({
            include: [
                {
                    model: db.Parking_Manager,
                    where: { ...whereClause, User_ID: req.token.id },
                },
            ],
        });
        return res
            .status(200)
            .json(api_response(false, 'Lấy danh sách quản lý bãi đỗ xe thành công', parking_managers));
    }),

    // [POST] /api/parking_manager/
    add_parking_manager: async_wrap(async (req, res) => {
        const manager = await db.User.findOne({ where: { Email: req.body.Email } });
        if (!manager || manager.Role != label.role.MANAGER)
            throw new APIError(400, 'Không tìm thấy người quản lý sở hữu Email bạn đã nhập');

        const parking_manager = await db.Parking_Manager.create({
            User_ID: manager.User_ID,
            Parking_ID: req.body.Parking_ID,
        });
        return res.status(201).json(api_response(false, 'Thêm quản lý bãi đỗ xe mới thành công', parking_manager));
    }),

    // [PATCH] /api/parking_manager/:id
    update_parking_manager: async_wrap(async (req, res) => {
        if (req.token.role == label.role.ADMIN) {
            if (!req.body.User_ID) throw new APIError(400, 'Vui lòng cung cấp ID người quản lý bãi đỗ xe');
            const parking_manager = await db.Parking_Manager.findOne({
                where: { User_ID: req.body.User_ID, Parking_ID: req.params.id },
            });
            parking_manager.Is_Managing = false;
            await parking_manager.save();
            return res.status(200).json(api_response(false, 'Cập nhật thông tin quản lý bãi đỗ xe thành công'));
        }

        const parking_managers = await db.Parking_Manager.findAll({
            where: {
                [db.Sequelize.Op.or]: [{ User_ID: req.token.id }, { Parking_ID: req.params.id }],
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

        const parking_manager = await db.Parking_Manager.findOne({
            where: { User_ID: req.token.id, Parking_ID: req.params.id },
        });

        if (!parking_manager) throw new APIError(404, 'Không tìm thấy thông tin quản lý bãi đỗ xe');

        parking_manager.Is_Managing = req.body.Is_Managing;
        await parking_manager.save();

        return res
            .status(200)
            .json(
                api_response(
                    false,
                    parking_manager.Is_Managing ? 'Bắt đầu quản lý vào ra bãi đỗ xe' : 'Dừng quản lý vào ra bãi đỗ xe',
                ),
            );
    }),

    // [DELETE] /api/parking_manager/:user_id/:parking_id
    delete_parking_manager: async_wrap(async (req, res) => {
        const result = await db.Parking_Manager.destroy({
            where: { User_ID: req.params.user_id, Parking_ID: req.params.parking_id },
        });

        if (result === 1) return res.status(200).json(api_response(false, 'Xóa quản lý bãi đỗ xe thành công'));
        else throw new APIError(404, 'Không tìm thấy thông tin quản lý bãi đỗ xe');
    }),
};

export default controller;
