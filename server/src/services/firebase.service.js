import path from 'path';
import fs from 'fs';
const firebase = require('firebase/app');
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import firebaseConfig from '../config/firebase.config.json';

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

const service = {
    delete_temp: () => {
        // Xóa tất cả các file trong thư mục temp sau khi tải lên
        const dir = path.join(__dirname, '..', 'temp');
        fs.readdirSync(dir).forEach((f) => fs.rmSync(`${dir}/${f}`));
    },

    extractFileNameFromUrl: (fileUrl) => {
        // Sử dụng logic của bạn để trích xuất tên file từ URL
        // Trong trường hợp này, tôi sẽ sử dụng phương pháp đơn giản bằng cách cắt chuỗi từ URL
        const urlParts = fileUrl.split('/');
        const fileNameWithToken = urlParts[urlParts.length - 1];
        const fileName = fileNameWithToken.split('?')[0];
        return fileName;
    },

    upload_image: async (filePath) => {
        // Đặt tên mới cho file trên Firebase Storage
        const newFilename = `${Date.now()}-${path.basename(filePath)}`;
        const storageRef = ref(storage, newFilename);

        // Chuẩn bị metadata của file, ở đây là loại file là 'image/jpeg' (điều chỉnh tùy loại ảnh)
        const metadata = { contentType: 'image/jpeg' };

        // Đọc nội dung của file và tải lên Firebase Storage
        const fileBuffer = fs.readFileSync(filePath);
        await uploadBytes(storageRef, fileBuffer, metadata);

        service.delete_temp();

        // Lấy URL tải xuống của file đã tải lên
        const downloadURL = await getDownloadURL(storageRef);

        // Trả về URL tải xuống của file đã tải lên
        return downloadURL;
    },

    delete_file: async (fileUrl) => {
        // Kiểm tra tính hợp lệ của đường dẫn file
        try {
            const downloadUrl = await getDownloadURL(ref(storage, fileUrl));
            if (!downloadUrl) {
                console.error(`Đường dẫn không hợp lệ hoặc file không tồn tại`);
                return false;
            }
        } catch (error) {
            console.error(`Đường dẫn không hợp lệ hoặc file không tồn tại`);
            return false;
        }

        // Trích xuất tên file từ URL
        const fileName = service.extractFileNameFromUrl(fileUrl);

        // Tạo tham chiếu đến file trong Firebase Storage
        const storageRef = ref(storage, fileName);

        // Xóa file
        await deleteObject(storageRef);
        console.log(`File ${fileName} đã được xóa thành công từ Firebase Storage`);

        return true; // Nếu xóa thành công, trả về true
    },
};

export default service;
