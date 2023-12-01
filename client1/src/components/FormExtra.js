export default function FormExtra() {
    return (
        <div className="flex items-center justify-between ">
            <div className="flex items-center">
                {/* <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-black-600 focus:ring-black-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Lưu lại thông tin đăng nhập
                </label> */}
            </div>

            <div className="text-sm">
                <a href="#" className="font-medium text-gray-800 hover:text-gray-500">
                    Quên mật khẩu?
                </a>
            </div>
        </div>
    );
}
