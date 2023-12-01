import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';

const controller = {
    // [GET] /api/parking_card/
    get_all_parking_card: async_wrap(async (req, res) => {
        const parking_cards = await db.Parking_Card.findAll();
        return res.status(200).json(api_response(false, 'Lấy danh sách thẻ gửi xe thành công', parking_cards));
    }),

    // [GET] /api/parking_card/user/:id
    get_parking_card_by_user: async_wrap(async (req, res) => {
        const parking_cards = await db.Parking_Card.findAll({
            where: { User_ID: req.params.id },
        });
        return res.status(200).json(api_response(false, 'Lấy danh sách thẻ gửi xe thành công', parking_cards));
    }),

    // [GET] /api/parking_card/:id
    get_parking_card_by_id: async_wrap(async (req, res) => {
        const parking_card = await db.Parking_Card.findByPk(req.params.id);
        if (!parking_card) return res.status(404).json(api_response(true, 'Không tìm thấy thẻ gửi xe'));
        return res.status(200).json(api_response(false, 'Lấy thông tin thẻ gửi xe thành công', parking_card));
    }),

    // [POST] /api/parking_card/
    add_parking_card: async_wrap(async (req, res) => {
        const user = await db.User.findOne({ where: { Email: req.body.Email } });
        if (!user && req.body.Email)
            return res.status(400).json(api_response(true, 'Email chưa được đăng ký tài khoản trước đó'));
        const parking_card = await db.Parking_Card.create({
            User_ID: user ? user.User_ID : null,
        });
        return res.status(201).json(api_response(false, 'Thêm thẻ gửi xe mới thành công', parking_card));
    }),

    // [PATCH] /api/parking_card/:id
    update_parking_card: async_wrap(async (req, res) => {
        const parking_card = await db.Parking_Card.findByPk(req.params.id);
        if (!parking_card) return res.status(404).json(api_response(true, 'Không tìm thấy thẻ gửi xe'));

        parking_card.Is_Lock = req.body.Is_Lock;
        await parking_card.save();

        return res.status(200).json(api_response(false, 'Cập nhật thông tin thẻ gửi xe thành công'));
    }),

    // [DELETE] /api/parking_card/:id
    delete_parking_card: async_wrap(async (req, res) => {
        const result = await db.Parking_Card.destroy({
            where: { Card_ID: req.params.id },
        });

        if (result === 1) return res.status(200).json(api_response(false, 'Xóa thẻ gửi xe thành công'));
        else return res.status(404).json(api_response(true, 'Không tìm thấy thẻ gửi xe'));
    }),
};

export default controller;
