const async_wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

export default async_wrap;
