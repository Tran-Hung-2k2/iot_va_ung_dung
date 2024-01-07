import { useNavigate } from 'react-router-dom';

import fields from '../constants/cardFields';
import FormAdd from '../components/FormAdd';
import service from '../services/card.service';

export default function CardAdd() {
    const navigate = useNavigate();

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        await service.addParkingCard(data);

        navigate('/card/manager');
    };

    return <FormAdd fields={fields} title="Tạo thẻ gửi xe" onSubmit={handleSubmit} />;
}
