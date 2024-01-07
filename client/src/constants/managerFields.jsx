const fields = [
    {
        label: 'Tên người dùng',
        id: 'Name',
        type: 'text',
        required: true,
        placeholder: 'Tên người dùng',
    },
    {
        label: 'Email',
        id: 'Email',
        type: 'email',
        required: true,
        placeholder: 'Địa chỉ Email',
    },
    {
        label: 'Số điện thoại',
        id: 'Phone_Number',
        type: 'text',
        required: true,
        placeholder: 'Số điện thoại',
    },
    {
        label: 'Địa chỉ',
        id: 'Address',
        type: 'text',
        required: true,
        placeholder: 'Địa chỉ',
    },
    {
        label: 'Mật khẩu',
        id: 'Password',
        type: 'password',
        required: true,
        placeholder: 'Mật khẩu',
    },
    {
        label: 'Nhập lại mật khẩu',
        id: 'Confirm_Password',
        type: 'password',
        required: true,
        placeholder: 'Nhập lại mật khẩu',
    },
];

export default fields;
