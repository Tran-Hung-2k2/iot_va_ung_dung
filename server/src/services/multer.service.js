import multer from 'multer';
import path from 'path';

const service = {
    upload: multer({ dest: path.join(__dirname, '../temp/') }),
};

export default service;
