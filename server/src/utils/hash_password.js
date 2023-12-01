import bcrypt from 'bcrypt';

const hash_password = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);
    return hashed_password;
};

export default hash_password;
