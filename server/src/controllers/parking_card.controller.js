import label from '../constants/label.js';
import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';
import APIError from '../utils/api_error.js';

const controller = {
    // [GET] /api/parking_card/
    get_all_parking_card: async_wrap(async (req, res) => {
        const parking_cards = await db.Parking_Card.findAll({
            include: [
                {
                    model: db.User,
                    attributes: ['User_ID', 'Name', 'Avatar', 'Email', 'Role'],
                },
            ],
        });
        return res.status(200).json(api_response(false, 'Lấy danh sách thẻ gửi xe thành công', parking_cards));
    }),

    // [GET] /api/parking_card/user
    get_parking_card_by_user: async_wrap(async (req, res) => {
        const parking_cards = await db.Parking_Card.findAll({
            where: { User_ID: req.token.id },
            include: [
                {
                    model: db.User,
                    attributes: ['User_ID', 'Name', 'Avatar', 'Email', 'Role'],
                },
            ],
        });

        return res.status(200).json(api_response(false, 'Lấy danh sách thẻ gửi xe thành công', parking_cards));
    }),

    // [GET] /api/parking_card/info
    get_parking_card_info: async_wrap(async (req, res) => {
        const parking_card = await db.Parking_Card.findByPk(req.query.Card_ID, {
            include: [
                {
                    model: db.User,
                    attributes: ['Name', 'Balance', 'Role'],
                },
            ],
        });

        return res.status(200).json(api_response(false, 'Lấy danh sách thẻ gửi xe thành công', parking_card));
    }),

    // [POST] /api/parking_card/
    add_parking_card: async_wrap(async (req, res) => {
        const user = await db.User.findOne({ where: { Email: req.body.Email } });
        if (!user) throw new APIError(400, 'Email chưa được đăng ký tài khoản trước đó');

        const parking_card = await db.Parking_Card.create({
            User_ID: user.User_ID,
        });
        return res.status(201).json(api_response(false, 'Thêm thẻ gửi xe mới thành công', parking_card));
    }),

    // [PATCH] /api/parking_card/:id
    update_parking_card: async_wrap(async (req, res) => {
        const parking_card = await db.Parking_Card.findByPk(req.params.id);
        if (!parking_card) throw new APIError(404, 'Không tìm thấy thẻ gửi xe');

        if (req.token.role == label.role.ADMIN) {
            parking_card.Is_Lock = req.body.Is_Lock;
            await parking_card.save();

            return res.status(200).json(api_response(false, 'Cập nhật thông tin thẻ gửi xe thành công', parking_card));
        } else {
            if (parking_card.User_ID != req.token.id)
                throw new APIError(403, 'Bạn không có quyền cập nhật thẻ gửi xe của người khác');

            parking_card.Is_Lock = req.body.Is_Lock;
            await parking_card.save();

            return res.status(200).json(api_response(false, 'Cập nhật thông tin thẻ gửi xe thành công', parking_card));
        }
    }),

    // [DELETE] /api/parking_card/:id
    delete_parking_card: async_wrap(async (req, res) => {
        if (req.token.role == label.role.ADMIN) {
            const result = await db.Parking_Card.destroy({
                where: { Card_ID: req.params.id },
            });

            if (result === 1) return res.status(200).json(api_response(false, 'Xóa thẻ gửi xe thành công'));
            else throw new APIError(404, 'Không tìm thấy thẻ gửi xe');
        } else {
            const parking_card = await db.Parking_Card.findByPk(req.params.id);
            if (!parking_card) throw new APIError(404, 'Không tìm thấy thẻ gửi xe');
            if (parking_card.User_ID != req.token.id)
                throw new APIError(403, 'Bạn không có quyền xóa thẻ gửi xe của người khác');

            const result = await db.Parking_Card.destroy({
                where: { Card_ID: req.params.id },
            });

            if (result === 1) return res.status(200).json(api_response(false, 'Xóa thẻ gửi xe thành công'));
            else throw new APIError(404, 'Không tìm thấy thẻ gửi xe');
        }
    }),
};

export default controller;
