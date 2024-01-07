import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { ValidationError } from 'express-validation';
import route from './src/routes/index.js';
import api_response from './src/utils/api_response.js';
import APIError from './src/utils/api_error.js';

dotenv.config();
const PORT = process.env.PORT || 10000;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    cors({
        origin: [
            'https://localhost:5173',
            'http://localhost:5173',
            'https://coursera-cnweb.onrender.com',
            'https://tranhung912002.id.vn',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: [
            'set-cookie',
            'Content-Type',
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Credentials',
        ],
    }),
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route(app);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        const errorDetails = err.details || {};

        const bodyErrors = errorDetails.body || [];
        const paramsErrors = errorDetails.params || [];
        const queryErrors = errorDetails.query || [];

        return res
            .status(err.statusCode)
            .json(api_response(true, 'Dữ liệu không hợp lệ', [...bodyErrors, ...paramsErrors, ...queryErrors]));
    } else if (err instanceof APIError) {
        return res.status(err.statusCode).json(api_response(true, err.message));
    }
    console.log(err);
    return res.status(500).json(api_response(true, 'Có lỗi xảy ra. Vui lòng thử lại sau'));
});

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
