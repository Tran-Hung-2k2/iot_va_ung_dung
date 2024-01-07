const fields = [
    {
        label: 'Tên bãi đỗ xe',
        id: 'Name',
        type: 'text',
        required: true,
        placeholder: 'Tên bãi đỗ xe',
    },
    {
        label: 'Địa chỉ',
        id: 'Address',
        type: 'text',
        required: true,
        placeholder: 'Địa chỉ',
    },
    {
        label: 'Phí gửi xe (nghìn VNĐ)',
        id: 'Charge',
        type: 'number',
        required: true,
        placeholder: 'Ví dụ: 2 = 2000VNĐ',
    },
    {
        label: 'Sức chứa tối đa',
        id: 'Max_Space',
        type: 'number',
        required: true,
        placeholder: 'Ví dụ: 1000',
    },
];

export default fields;
