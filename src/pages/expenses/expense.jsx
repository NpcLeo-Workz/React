import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

const Expense = ({id, name, amount, date}) => {
    const navigate = useNavigate()
    const handleNavigate = () =>{
        navigate(`${id}`)
    }
    return (
        <div className="expense">
            <h3>{name}</h3>
            <p>{amount}</p>
            <p>{date.getDay()}/{date.getMonth()}/{date.getFullYear()}</p>
            {id && <Button onClick={handleNavigate}>Details</Button>}
        </div>
    )
}

export default Expense;
