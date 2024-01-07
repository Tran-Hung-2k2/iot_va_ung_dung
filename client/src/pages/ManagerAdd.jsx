import { useNavigate } from 'react-router-dom';

import fields from '../constants/managerFields';
import FormAdd from '../components/FormAdd';
import service from '../services/user.service';
import label from '../constants/label';

export default function ManagerAdd() {
    const navigate = useNavigate();

    const handleSubmit = async (e, data) => {
        e.preventDefault();

        await service.addManager({
            ...data,
            Role: label.role.MANAGER,
        });

        navigate('/user/manager');
    };

    return <FormAdd fields={fields} title="Thêm người quản lý bãi đỗ xe" onSubmit={handleSubmit} />;
}
