import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';
import APIError from '../utils/api_error.js';
import label from '../constants/label.js';
import firebase_service from '../services/firebase.service.js';

const controller = {
    // [GET] api/parking_record/
    get_all_parking_record: async_wrap(async (req, res) => {
        let data;
        if (req.token.role == label.role.ADMIN) {
            data = await db.Parking_Record.findAll({
                include: [
                    {
                        model: db.Parking_Card,
                        include: {
                            model: db.User,
                            attributes: ['User_ID', 'Name', 'Avatar', 'Email', 'Role'],
                        },
                    },
                    {
                        model: db.Parking,
                    },
                ],
            });
        } else if (req.token.role == label.role.MANAGER) {
            if (!req.query?.Parking_ID) throw new APIError('400', 'Bạn chưa cung cấp ID của bãi đỗ xe');

            const parking_manager = await db.Parking_Manager.findOne({
                where: { Parking_ID: req.query.Parking_ID, User_ID: req.token.id },
            });
            if (!parking_manager)
                throw new APIError('403', 'Bạn không có quyền xem thông tin vào ra của bãi đỗ xe này');
            else {
                data = await db.Parking_Record.findAll({
                    include: [
                        {
                            model: db.Parking_Card,
                        },
                        {
                            model: db.Parking,
                            where: {
                                Parking_ID: req.query.Parking_ID,
                            },
                        },
                    ],
                });
            }
        } else {
            data = await db.Parking_Record.findAll({
                include: [
                    {
                        model: db.Parking_Card,
                        where: {
                            User_ID: req.token.id,
                        },
                        include: {
                            model: db.User,
                            attributes: ['User_ID', 'Name', 'Avatar', 'Email', 'Role'],
                        },
                    },
                    {
                        model: db.Parking,
                    },
                ],
            });
        }
        return res.status(200).json(api_response(false, 'Lấy danh sách thông tin gửi xe thành công', data));
    }),

    // [GET] /api/parking_record/lastest
    get_lastest_record: async_wrap(async (req, res) => {
        const parking = await db.Parking.findByPk(req.query.Parking_ID);
        if (!parking) throw new APIError(404, 'Không tìm thấy bãi đỗ xe');

        const parking_card = await db.Parking_Card.findByPk(req.query.Card_ID);
        if (!parking_card) throw new APIError(404, 'Không tìm thấy thẻ gửi xe');

        const queryParams = ['Parking_ID', 'Card_ID'];
        const whereClause = {};

        queryParams.forEach((param) => {
            if (req.query[param]) {
                whereClause[param] = req.query[param];
            }
        });

        const data = await db.Parking_Record.findOne({
            where: { ...whereClause, Action: label.action.GO_IN },
            order: [['createdAt', 'DESC']],
        });

        return res.status(200).json(api_response(false, 'Lấy thông tin gửi xe thành công', data));
    }),

    // [POST] api/parking_record/
    add_parking_record: async_wrap(async (req, res) => {
        const parking = await db.Parking.findByPk(req.body.Parking_ID);
        if (!parking) throw new APIError(404, 'Không tìm thấy bãi đỗ xe');

        const parking_card = await db.Parking_Card.findByPk(req.body.Card_ID);
        if (!parking_card) throw new APIError(404, 'Không tìm thấy thẻ gửi xe');
        if (parking_card.Is_Lock) throw new APIError(400, 'Thẻ gửi xe đang bị khóa');
        const user = await db.User.findByPk(parking_card.User_ID);

        if (!req.file) throw new APIError(400, 'Ảnh biển số xe là bắt buộc');

        const latestRecord = await db.Parking_Record.findOne({
            where: {
                Parking_ID: req.body.Parking_ID,
                Card_ID: req.body.Card_ID,
            },
            order: [['createdAt', 'DESC']],
        });

        if (latestRecord) {
            if (latestRecord.Action == req.body.Action) {
                if (req.body.Action == label.action.GO_OUT) throw new APIError(400, 'Xe chưa được gửi trước đó');
                else throw new APIError(400, 'Thẻ này đã được gửi xe trước đó');
            }
        } else if (req.body.Action == label.action.GO_OUT) throw new APIError(400, 'Xe chưa được gửi trước đó');

        req.body.Image = await firebase_service.upload_image(req.file.path);
        if (user.Role == label.role.ADMIN) {
            req.body.Fee = 0;
            req.body.Balance = 0;
        } else {
            if (req.body.Action == label.action.GO_IN)
                if (user.Balance < parking.Charge) throw new APIError(400, 'Số dư không đủ');

            req.body.Fee = req.body.Action == label.action.GO_OUT ? parking.Charge : 0;
            user.Balance = user.Balance - req.body.Fee;
            req.body.Balance = user.Balance;
            await user.save();
        }

        if (req.body.Action == label.action.GO_IN) {
            parking.Number_Of_Vehicles = parking.Number_Of_Vehicles + 1;
        } else parking.Number_Of_Vehicles = parking.Number_Of_Vehicles - 1;
        await parking.save();

        await db.Parking_Record.create(req.body);

        return res
            .status(201)
            .json(
                api_response(
                    false,
                    req.body.Action == label.action.GO_IN ? 'Gửi xe thành công' : 'Xe được phép ra',
                    user,
                ),
            );
    }),
};

export default controller;
