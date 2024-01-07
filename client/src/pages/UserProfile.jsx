import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { IoCameraOutline } from 'react-icons/io5';
import { LuFileEdit } from 'react-icons/lu';

import avatar from '../assets/images/avatar.jpg';
import service from '../services/user.service';
import action from '../redux/auth/auth.action';

const UserProfile = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isAvatarUpdated, setIsAvatarUpdated] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [editedName, setEditedName] = useState(user.Name);
    const dispatch = useDispatch();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setIsAvatarUpdated(true);
    };

    const handleNameChange = (event) => {
        setEditedName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            if (selectedFile || editedName) {
                const formData = new FormData();
                if (selectedFile) formData.append('Avatar', selectedFile);
                if (editedName) formData.append('Name', editedName);

                const res = await service.updateUserDetail(formData);
                dispatch(action.updateUser(res.data));

                setSelectedFile(null);
                setEditingName(false);
                setIsAvatarUpdated(false);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center my-10">
            <form
                className="py-8 px-8 min-w-[20%] max-w-sm bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
                onSubmit={handleSubmit}
            >
                <div className="relative inline-block">
                    <img
                        className="w-24 h-24 border-2 rounded-full shadow border-primary"
                        alt="Avatar"
                        src={isAvatarUpdated ? URL.createObjectURL(selectedFile) : user?.Avatar || avatar}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="absolute left-0 z-10 w-24 opacity-0 cursor-pointer top-10"
                        onChange={handleFileChange}
                    />
                    <IoCameraOutline className="absolute w-8 h-8 cursor-pointer text-slate-300 top-14 left-8" />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                    <div className="space-y-0.5">
                        {editingName ? (
                            <input
                                type="text"
                                value={editedName}
                                onChange={handleNameChange}
                                className="w-40 text-lg font-semibold text-black border-b focus:outline-none focus:border"
                            />
                        ) : (
                            <p
                                className="text-lg font-semibold text-black cursor-pointer"
                                onClick={() => setEditingName(true)}
                            >
                                {editedName}
                                <LuFileEdit className="inline-block ml-2" />
                            </p>
                        )}
                        <p className="font-medium text-slate-500">{user.Role}</p>
                    </div>
                    <div>
                        {(isAvatarUpdated || editingName) && (
                            <button
                                type="submit"
                                className={`btn btn-primary btn-sm btn-outline ${loading && 'btn-disabled'}`}
                            >
                                Cập nhật
                            </button>
                        )}
                    </div>
                </div>
            </form>

            <div className="bg-white min-w-[50%] max-w-2xl shadow-xl overflow-hidden sm:rounded-lg py-10">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Thông tin tài khoản</h3>
                    <p className="max-w-2xl mt-1 text-sm text-gray-500">Thông tin chi tiết của người dùng</p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Họ và tên</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.Name}</dd>
                        </div>
                        <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.Email}</dd>
                        </div>
                        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Vai trò</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.Role}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
