import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import fields from '../constants/deviceFields';
import FormAdd from '../components/FormAdd';
import service from '../services/device.service';
import parkingService from '../services/parking.service';
import Loader from '../components/Loader';

export default function ParkingAdd() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getParking() {
            const res = await parkingService.getAllParking();

            const parkings = res.data;
            fields.forEach((field) => {
                if (field.id === 'Parking_ID') {
                    field.options = [
                        { 'null': 'Không phục vụ' },
                        ...parkings.map((parking) => ({
                            [parking.Parking_ID]: parking.Name,
                        })),
                    ];
                }
            });
        }
        setLoading(true);
        getParking();
        setLoading(false);
    }, []);

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        data.Parking_ID = data.Parking_ID == 'null' ? null : data.Parking_ID;

        await service.addDevice(data);
        navigate('/device/manager');
    };

    return loading ? <Loader /> : <FormAdd fields={fields} title="Thêm thiết bị" onSubmit={handleSubmit} />;
}
