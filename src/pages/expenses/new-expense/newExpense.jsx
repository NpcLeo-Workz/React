import {useCreateExpense} from "../../../api/expenseAPI.js";
import {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import ResponseMessage from "../../../utils/responseMessage.jsx";
import FormSubmitButtonWithLoading from "../../../utils/formSubmitButtonWithLoading.jsx";
import {useNavigate} from "react-router-dom";
import {useGetAllCategories} from "../../../api/categoryAPI.js";

const NewExpense = () => {
    //               name,
    //               amount,
    //               originalCurrencyId,
    //               originalCurrencyAmount,
    //               date,
    //               categoryId,
    //               description
    const [name,  setName]  = useState('')
    const [amount, setAmount] = useState(1)
    const [originalCurrencyId,  setOriginalCurrencyId] = useState(0)
    const [originalCurrencyAmount, setOriginalCurrencyAmount] = useState(0)
    const [date, setDate] = useState(new Date())
    const [categoryId, setCategoryId] = useState(1)
    const [description, setDescription] = useState('')
    const  {mutate: createNewExpense} = useCreateExpense()
    const navigateFn = useNavigate()
    const {data: categories}= useGetAllCategories()
    const dateHandler=(e)=>{
        console.log(e.target.value)
        const newDate = new Date(e.target.value)
        setDate(newDate)
    }
    const createExpenseHandler = (event)  =>{
        event.preventDefault()
        console.log(name,
            amount,
            originalCurrencyId,
            originalCurrencyAmount,
            date,
            categoryId,
            description)
        createNewExpense({
            name,
            amount,
            originalCurrencyId,
            originalCurrencyAmount,
            date,
            categoryId,
            description})
        setTimeout(() => navigateFn('/expenses'), 1500)
    }
    const getCategories=(
        <>
            {categories.map(cat=> <option value={cat.id}>{cat.name}</option>)}
        </>
    )

    return (
        <Container className="d-flex flex-column vh-100">
            <Row className="justify-content-center">
                <Col xs={12} sm={8}>

                    <Row>
                        <Form onSubmit={createExpenseHandler}>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" required placeholder="enter name" value={name}
                                              onChange={e => setName(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicAmount">
                                <Form.Label>amount</Form.Label>
                                <Form.Control type="number" required placeholder="value in euros" value={amount}
                                              onChange={e => setAmount(parseInt(e.target.value))}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicDate">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" required
                                              onChange={e => setDate(new Date(e.target.value)) }/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Select required onChange={c => setCategoryId(parseInt(c.target.value))}>
                                    <option value="choose" disabled selected="selected">
                                        -- Select category --
                                    </option>
                                    {getCategories}
                                </Form.Select>
                            </Form.Group>
                            {/*make option international expense: currency, originalCurrencyAmount, */}
                            {/*make option new currency: name, ISO, symbol */}
                            {/*make option Home Delivery: for each: price, deliveryDate, description */}
                            <Button variant="primary" type="submit">
                                Create expense
                            </Button>
                        </Form>

                    </Row>

                </Col>
            </Row>
        </Container>
    )
}

export default NewExpense;
