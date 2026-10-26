import "../../App.css";
<<<<<<< HEAD
=======
import './Button.css'
import { useNavigate } from "react-router-dom";
>>>>>>> 1196073175592109a13f7e0bb8b6f7704645dc99

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