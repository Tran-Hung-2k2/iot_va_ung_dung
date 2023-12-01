import Header from '../components/Header';
import Signup from '../components/Signup';

export default function SignupPage() {
    return (
        <>
            <Header
                heading="Đăng ký tài khoản"
                paragraph="Bạn đã có tài khoản? "
                linkName="Đăng nhập"
                linkUrl="/login"
            />
            <Signup />
        </>
    );
}
