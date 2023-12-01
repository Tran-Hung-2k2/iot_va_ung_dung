import { toast } from 'react-toastify';

const notify = (text, type, duration = 3000, position = 'bottom-right') => {
    toast[type](text, {
        position: position,
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};

export default notify;
