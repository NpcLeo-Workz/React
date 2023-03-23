import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Delivery = ({description, price, expectedDeliveryDate, expenseId}) => {
    const navigate = useNavigate()

    const handleNavigate = ()=>{
        navigate(`/expenses/${expenseId}`)
    }
    return (
        <div className="delivery">
            <h3>{description}</h3>
            <p>{price}</p>
            <p>{expectedDeliveryDate.getDate()}/{expectedDeliveryDate.getMonth()}/{expectedDeliveryDate.getFullYear()}</p>
            {expenseId && <Button onClick={handleNavigate}>Details</Button>}
        </div>
    )
}

export default Delivery;
