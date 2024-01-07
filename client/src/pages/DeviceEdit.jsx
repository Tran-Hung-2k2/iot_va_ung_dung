import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import fields from '../constants/deviceFields';
import FormEdit from '../components/FormEdit';
import service from '../services/device.service';
import parkingService from '../services/parking.service';
import Loader from '../components/Loader';

export default function ParkingAdd() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { Device_ID } = useSelector((state) => state.device);

    useEffect(() => {
        async function getParking() {
            const res = await parkingService.getAllParking();

            const parkings = res.data;
            fields.forEach((field) => {
                if (field.id === 'Parking_ID') {
                    field.options = [
                        { null: 'Không phục vụ' },
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

    const getData = async () => {
        const res = await service.getAllDevice({ Device_ID });

        let { Name, Parking_ID } = res.data[0];
        Parking_ID = Parking_ID ? Parking_ID : 'null';
        return { Name, Parking_ID };
    };

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        data.Parking_ID = data.Parking_ID == 'null' ? null : data.Parking_ID;
        await service.updateDevice(data, Device_ID);
        navigate('/device/manager');
    };

    return loading ? (
        <Loader />
    ) : (
        <FormEdit fields={fields} title="Cập nhật thiết bị" onSubmit={handleSubmit} getData={getData} />
    );
}
