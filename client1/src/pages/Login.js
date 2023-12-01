import Header from '../components/Header';
import Login from '../components/Login';

export default function LoginPage() {
    return (
        <>
            <Header
                heading="Đăng nhập tài khoản"
                paragraph="Bạn chưa có tài khoản? "
                linkName="Đăng ký ngay"
                linkUrl="/signup"
            />
            <Login />
        </>
    );
}
