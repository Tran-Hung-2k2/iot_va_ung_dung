import { useNavigate } from 'react-router-dom';

import fields from '../constants/balanceFields';
import FormAdd from '../components/FormAdd';
import service from '../services/user.service';
import label from '../constants/label';

export default function BalanceAdd() {
    const navigate = useNavigate();

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        await service.addBalance(data);

        navigate('/user/manager');
    };

    return <FormAdd fields={fields} title="Nạp tiền vào tài khoản người dùng" onSubmit={handleSubmit} />;
}
