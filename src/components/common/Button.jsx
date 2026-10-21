import "../../App.css";
import { useNavigate } from "react-router-dom";

function Button({name}) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (name === 'Back') {
            navigate(-1);
        }
    }
    return (
        <button className="btn" type="button" onClick={handleClick}>
            {name}
        </button>
    )
}

export default Button;