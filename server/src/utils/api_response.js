const api_response = (is_error = false, message = 'Thành công', data, ...rest_data) => {
    if (typeof is_error !== 'boolean') {
        throw new Error('Tham số is_error phải là kiểu boolean');
    }

    if (typeof message !== 'string') {
        throw new Error('Tham số message phải là kiểu chuỗi');
    }

    return {
        is_error,
        message,
        data,
        details: {
            body: [{ message }],
        },
        ...rest_data,
    };
};

export default api_response;
