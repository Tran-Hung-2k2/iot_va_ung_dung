import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import fields from '../constants/forgetPasswordFields';
import service from '../services/auth.service';

const fieldsState = fields.reduce((acc, field) => ({ ...acc, [field.id]: '' }), {});

export default function ForgetPassword() {
    const [state, setState] = useState(fieldsState);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await service.forget_password(state);
        } finally {
            setLoading(false);
        }
        navigate('/signin');
    };

    return (
        <form className="m-auto -translate-x-36 w-200" onSubmit={handleSubmit}>
            <h3 className="mb-2 text-2xl font-bold text-primary">Quên mật khẩu</h3>
            <div>
                Bạn đã có tài khoản?
                <NavLink to="/signin" className="ml-2 text-primary">
                    Đăng nhập
                </NavLink>
            </div>
            <div className="flex flex-col my-6 space-y-4 w-80">
                {fields.map((field) => (
                    <input
                        key={field.id}
                        onChange={handleChange}
                        {...field}
                        className="w-full max-w-xl input input-bordered input-primary"
                    />
                ))}
            </div>

            <button type="submit" className={`btn btn-active btn-primary ${loading && 'btn-disabled'}`}>
                Quên mật khẩu
            </button>
        </form>
    );
}
