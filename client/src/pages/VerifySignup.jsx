import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import service from '../services/auth.service';

function VerifySignup() {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('Xác thực thất bại vui lòng đăng ký lại!');
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const verify = async () => {
            setLoading(true);

            const res = await service.verify_register({ register_token: searchParams.get('register_token') });
            setMessage(res.message);
            setLoading(false);
        };

        verify();
    }, []);

    return (
        <main className="grid px-6 py-6 bg-white">
            <div className="text-center mt-36">
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    {loading ? 'Đang xác thực tài khoản' : message}
                </h1>
                {loading ? (
                    <span className="w-20 mt-6 loading loading-ring bg-primary"></span>
                ) : (
                    <div>
                        <div className="flex items-center justify-center mt-10 gap-x-6">
                            <a
                                href="/signin"
                                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                Đăng nhập ngay
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default VerifySignup;
