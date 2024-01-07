import { useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';

import fields from '../constants/verifyForgetPasswordFields';
import service from '../services/auth.service';

const fieldsState = fields.reduce((acc, field) => ({ ...acc, [field.id]: '' }), {});

export default function VerifyForgetPassword() {
    const [state, setState] = useState(fieldsState);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await service.verify_forget_password({...state, reset_pass_token: searchParams.get('reset_pass_token') });
        } finally {
            setLoading(false);
        }
        navigate('/signin');
    };

    return (
        <form className="m-auto -translate-x-36 w-200" onSubmit={handleSubmit}>
            <h3 className="mb-2 text-2xl font-bold text-primary">Thiết lập lại mật khẩu</h3>
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
                Thiết lập lại
            </button>
        </form>
    );
}
