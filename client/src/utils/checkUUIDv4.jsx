const uuidv4Pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

const checkUUIDv4 = (str) => {
    return uuidv4Pattern.test(str);
};

export default checkUUIDv4;
