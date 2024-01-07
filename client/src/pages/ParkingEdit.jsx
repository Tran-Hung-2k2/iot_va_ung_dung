import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import fields from '../constants/parkingFields';
import FormEdit from '../components/FormEdit';
import service from '../services/parking.service';

export default function ParkingEdit() {
    const { Parking_ID } = useSelector((state) => state.parking);
    const navigate = useNavigate();

    const getData = async () => {
        const res = await service.getAllParking({ Parking_ID });
        const parking = res.data[0];
        return { Name: parking.Name, Max_Space: parking.Max_Space, Address: parking.Address, Charge: parking.Charge };
    };

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        await service.updateParking(data, Parking_ID);
        navigate(-1);
    };

    return <FormEdit fields={fields} title="Cập nhật bãi đỗ xe" onSubmit={handleSubmit} getData={getData} />;
}
