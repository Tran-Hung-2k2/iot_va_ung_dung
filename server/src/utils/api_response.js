const api_response = (error, message = 'Thành công', data) => {
    if (error) {
        return {
            error,
            message,
            errors: data,
        };
    } else {
        return {
            error,
            message,
            data,
        };
    }
};

export default api_response;
