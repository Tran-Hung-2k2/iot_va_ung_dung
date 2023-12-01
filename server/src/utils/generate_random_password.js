const generate_random_password = (length) => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    let newPassword = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        newPassword += characters.charAt(randomIndex);
    }

    return newPassword;
};

export default generate_random_password;
