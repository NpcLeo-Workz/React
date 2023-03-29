import {Button, Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useDeleteDelivery} from "../../api/deliveriesAPI.js";

const Delivery = ({id,description, price, expectedDeliveryDate, expenseId}) => {
    const navigate = useNavigate()
    const {mutate} = useDeleteDelivery()
    const handleNavigate = ()=>{
        navigate(`/expenses/${expenseId}`)
    }
    return (
        <Row>
            <Col>
                <h3>{description}</h3>
            </Col>
            <Col>
                <p>€{price}</p>
            </Col>
            <Col>
                <p>{expectedDeliveryDate.getDate()}/{expectedDeliveryDate.getMonth()}/{expectedDeliveryDate.getFullYear()}</p>
            </Col>
            <Col>
                {expenseId && <Button onClick={()=>  mutate({id})}>Delete</Button>}
            </Col>
            <Col>
                {expenseId && <Button onClick={handleNavigate}>Details</Button>}
            </Col>

        </Row>
    )
}

export default Delivery;
