import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useColorMode = () => {
    // Sử dụng hook useLocalStorage để lưu trạng thái màu sắc vào local storage
    const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light');

    // useEffect để theo dõi thay đổi trong colorMode và cập nhật lớp của thẻ body
    useEffect(() => {
        // Lớp CSS được thêm hoặc loại bỏ từ thẻ body để thay đổi chủ đề màu sắc
        const className = 'dark';
        const bodyClass = window.document.body.classList;

        // Nếu chủ đề màu sắc là 'dark', thêm lớp dark; ngược lại, loại bỏ lớp dark
        colorMode === 'dark' ? bodyClass.add(className) : bodyClass.remove(className);
    }, [colorMode]);

    // Trả về trạng thái colorMode và hàm để cập nhật nó
    return [colorMode, setColorMode];
};

export default useColorMode;
