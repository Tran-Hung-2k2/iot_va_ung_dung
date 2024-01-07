// getImage.js

import axios from 'axios';
import notify from './notify';

const getImage = async (ip, filename) => {
    try {
        const response = await axios.get(`http://${ip}:8080/photo.jpg`, {
            responseType: 'arraybuffer',
        });

        // Tạo một Blob từ dữ liệu nhận được
        const blob = new Blob([response.data], { type: 'image/jpeg' });

        // Tạo một đối tượng File từ Blob
        const imageFile = new File([blob], `${filename}.jpg`, { type: 'image/jpeg' });

        // Tạo URL từ Blob
        const imageUrl = URL.createObjectURL(blob);

        return { url: imageUrl, file: imageFile };
    } catch (error) {
        notify('Chụp ảnh thất bại, vui lòng kiểm tra lại địa chỉ IP (lưu ý phải bắt cùng mạng wifi)', 'error');
        console.error('Error:', error);
        return { url: null, file: null };
    }
};

export default getImage;
