const loginFields = [
    {
        labelText: 'Email',
        labelFor: 'Email',
        id: 'Email',
        name: 'Email',
        type: 'email',
        autoComplete: 'email',
        isRequired: true,
        placeholder: 'Địa chỉ Email',
    },
    {
        labelText: 'Password',
        labelFor: 'User_Password',
        id: 'User_Password',
        name: 'User_Password',
        type: 'password',
        autoComplete: 'current-password',
        isRequired: true,
        placeholder: 'Mật khẩu',
    },
];

const signupFields = [
    {
        labelText: 'Username',
        labelFor: 'User_Name',
        id: 'User_Name',
        name: 'User_Name',
        type: 'text',
        autoComplete: 'username',
        isRequired: true,
        placeholder: 'Tên người dùng',
    },
    {
        labelText: 'Email',
        labelFor: 'Email',
        id: 'Email',
        name: 'Email',
        type: 'email',
        autoComplete: 'email',
        isRequired: true,
        placeholder: 'Địa chỉ Email',
    },
    {
        labelText: 'Password',
        labelFor: 'User_Password',
        id: 'User_Password',
        name: 'User_Password',
        type: 'password',
        autoComplete: 'current-password',
        isRequired: true,
        placeholder: 'Mật khẩu',
    },
    {
        labelText: 'Confirm Password',
        labelFor: 'Confirm_Password',
        id: 'Confirm_Password',
        name: 'Confirm_Password',
        type: 'password',
        autoComplete: 'Confirm_Password',
        isRequired: true,
        placeholder: 'Nhập lại mật khẩu',
    },
];

export { loginFields, signupFields };
