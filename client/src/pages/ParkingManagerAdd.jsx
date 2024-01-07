import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import fields from '../constants/parkingManagerFields';
import FormAdd from '../components/FormAdd';
import service from '../services/parking_manger.service';

export default function ParkingManagerAdd() {
    const navigate = useNavigate();
    const { Parking_ID } = useSelector((state) => state.parking);

    const handleSubmit = async (e, data) => {
        e.preventDefault();

        await service.addParkingManager({
            ...data,
            Parking_ID
        });

        navigate('/user/parking_manager');
    };

    return <FormAdd fields={fields} title="Thêm người quản lý" onSubmit={handleSubmit} />;
}
