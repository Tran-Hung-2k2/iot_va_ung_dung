import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { ValidationError } from 'express-validation';
import route from './src/routes/index.js';
import api_response from './src/utils/api_response.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route(app);

app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err);
    }
    console.log(err);
    return res.status(500).json(api_response(true, 'Có lỗi xảy ra. Vui lòng thử lại sau'));
});

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
