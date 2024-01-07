import { useNavigate } from 'react-router-dom';

import fields from '../constants/parkingFields';
import FormAdd from '../components/FormAdd';
import service from '../services/parking.service';

export default function ParkingAdd() {
    const navigate = useNavigate();

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        await service.addParking(data);

        navigate('/parking/manager');
    };

    return <FormAdd fields={fields} title="Thêm bãi đỗ xe" onSubmit={handleSubmit} />;
}
