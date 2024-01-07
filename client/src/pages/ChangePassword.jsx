import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import fields from '../constants/changePasswordFields';
import service from '../services/auth.service';

const fieldsState = fields.reduce((acc, field) => ({ ...acc, [field.id]: '' }), {});

export default function ChangePassword() {
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
            await service.change_password(state);
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="m-auto -translate-x-36 w-200" onSubmit={handleSubmit}>
            <h3 className="mb-2 text-2xl font-bold text-primary">Đổi mật khẩu</h3>
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
                Đổi mật khẩu
            </button>
        </form>
    );
}
