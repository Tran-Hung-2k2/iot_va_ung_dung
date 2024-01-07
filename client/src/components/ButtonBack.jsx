import { useNavigate } from 'react-router-dom';

function ButtonBack({ className, ...otherProps }) {
    const navigate = useNavigate();

    return (
        <button className={`btn ${className || ''}`} {...otherProps} onClick={() => navigate(-1)}>
            Quay lại
        </button>
    );
}

export default ButtonBack;
