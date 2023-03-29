import {useNavigate} from "react-router-dom";
import {Button, Col, Row} from "react-bootstrap";

const Expense = ({id, name, amount, date}) => {
    const navigate = useNavigate()
    const handleNavigate = () =>{
        navigate(`${id}`)
    }
    return (
        <Row>
            <Col>
                <h5>{name}</h5>
            </Col>
            <Col>
                <p>€ {amount}</p>
            </Col>
            <Col>
                <p>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</p>
            </Col>
            <Col>
                {id && <Button onClick={handleNavigate}>Details</Button>}
            </Col>

        </Row>
    )
}

export default Expense;
