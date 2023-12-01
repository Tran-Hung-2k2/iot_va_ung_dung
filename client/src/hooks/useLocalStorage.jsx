import { useEffect, useState } from 'react';

function useLocalStorage(key, initialValue) {
    // State để lưu trữ giá trị
    // Truyền hàm trạng thái ban đầu vào useState để logic chỉ thực thi một lần
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Lấy từ local storage theo khóa
            const item = window.localStorage.getItem(key);
            // Phân tích cú pháp json lưu trữ hoặc trả về giá trị ban đầu nếu không có
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // Nếu có lỗi, cũng trả về giá trị ban đầu
            console.log(error);
            return initialValue;
        }
    });

    // useEffect để cập nhật local storage khi trạng thái thay đổi
    useEffect(() => {
        try {
            // Cho phép giá trị là một hàm để chúng ta có cùng API như useState
            const valueToStore = typeof storedValue === 'function' ? storedValue(storedValue) : storedValue;
            // Lưu trạng thái
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // Một triển khai phức tạp hơn sẽ xử lý trường hợp lỗi
            console.log(error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;
