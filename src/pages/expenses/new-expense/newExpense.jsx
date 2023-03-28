import {useCreateExpense} from "../../../api/expenseAPI.js";
import {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import ResponseMessage from "../../../utils/responseMessage.jsx";
import FormSubmitButtonWithLoading from "../../../utils/formSubmitButtonWithLoading.jsx";
import {useNavigate} from "react-router-dom";
import {useCreateCategory, useGetAllCategories} from "../../../api/categoryAPI.js";
import {useCreateCurrency, useGetAllCurrencies} from "../../../api/currencyAPI.js";

const NewExpense = () => {
    const [name,  setName]  = useState('')
    const [amount, setAmount] = useState(1)
    const [originalCurrencyId,  setOriginalCurrencyId] = useState(0)
    const [originalCurrencyAmount, setOriginalCurrencyAmount] = useState(0)
    const [date, setDate] = useState(new Date())
    const [categoryId, setCategoryId] = useState(1)
    const [description, setDescription] = useState('')
    const {mutate: createNewExpense} = useCreateExpense()
    const {mutate: createNewCategory}= useCreateCategory()
    const {mutate:  createNewCurrency}= useCreateCurrency()
    const navigateFn = useNavigate()
    const {data: categories}= useGetAllCategories()
    const {data: currencies}= useGetAllCurrencies()
    const [isNewCategory, setIsNewCategory] = useState(false)
    const [isNewCurrency, setIsNewCurrency] = useState(false)
    const [newCategory, setNewCategory]=useState('')
    const [isInternationalExpense,  setIsInternationalExpense]=useState(false)
    const[isDeliverToHome,setIsDeliverToHome]=useState(false)
    const[currencyName,setCurrencyName]=useState('')
    const[currencySymbol,setCurrencySymbol]=useState('')
    const[currencyISO,setCurrencyISO]=useState('')
    const categoryHandler = (event)=>{
        if(event.target.value === "new"){
            setIsNewCategory(true)
            return
        }
        setIsNewCategory(false)
        setCategoryId(parseInt(event.target.value))
    }
    const currencyHandler = (event)=>{
        if(event.target.value === "new"){
            setIsNewCurrency(true)
            return
        }
        setIsNewCurrency(false)
        setOriginalCurrencyId(parseInt(event.target.value))
    }
    const createExpenseHandler = (event)  =>{
        event.preventDefault()
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
    const createCategoryHandler=(event)=>{
        event.preventDefault()
        const name = newCategory
        createNewCategory({name})
        setIsNewCategory(false)
    }
    const createCurrencyHandler=(event)=>{
        event.preventDefault()
        const name  = currencyName
        const symbol = currencySymbol
        const iso = currencyISO
        createNewCurrency({name,symbol,iso})
        setIsNewCurrency(false)
    }
    const internationalHandler=()=>{
        setIsInternationalExpense(ex=>{return !ex})
    }
    const deliverToHomeHandler=()=>{
        setIsDeliverToHome(d=>{return !d})
    }
    const getCategories=(
        <>
            {categories.map(cat=> <option value={cat.id}>{cat.name}</option>)}
        </>
    )
    const  getCurrencies=(
        <>
            {currencies.map(cur=><option value={cur.id}>{cur.name}</option>)}
        </>
    )
    const newCategoryForm=(
        <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Row>
                <Col sm={8}>
                    <Form.Control type="text" required placeholder="Enter new Category" value={newCategory}
                                  onChange={e => setNewCategory(e.target.value)}/>
                </Col>
                <Col>
                    <Button variant="primary" onClick={createCategoryHandler}>
                        Add category
                    </Button>
                </Col>
            </Row>


        </Form.Group>
    )
    const newInternationalExpense=(<>
        <Form.Group>
            <Form.Label>Original Currency</Form.Label>
            <Form.Select required onChange={currencyHandler}>
                <option value="choose" disabled selected="selected">
                    -- Select currency --
                </option>
                {getCurrencies}
                <option value="new">add new currency</option>
            </Form.Select>
        </Form.Group>
        {isNewCurrency  &&
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Currency Name</Form.Label>
                        <Form.Control type="text" required placeholder="enter currency name" value={currencyName}
                                      onChange={e => setCurrencyName(e.target.value)}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Currency Symbol</Form.Label>
                        <Form.Control type="text" required placeholder="enter currency Symbol" value={currencySymbol}
                                      onChange={e => setCurrencySymbol(e.target.value)}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Currency ISO</Form.Label>
                        <Form.Control type="text" required placeholder="enter currency ISO" value={currencyISO}
                                      onChange={e => setCurrencyISO(e.target.value)}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Button variant="primary" onClick={createCurrencyHandler}>
                        Add currency
                    </Button>
                </Col>



            </Row>

        }


    </>
    )
    return (
        <Container className="d-flex flex-column vh-100">
            <Row className="justify-content-center">
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Check type="switch" label="International expense" checked={isInternationalExpense}
                                    onChange={internationalHandler}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check type="switch" label="Delivered to home" checked={isDeliverToHome}
                                    onChange={deliverToHomeHandler}/>
                    </Form.Group>
                </Col>
                <Col sm={8}>

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
                                <Form.Select required onChange={categoryHandler}>
                                    <option value="choose" disabled selected="selected">
                                        -- Select category --
                                    </option>
                                    {getCategories}
                                    <option value="new">add new category</option>
                                </Form.Select>
                            </Form.Group>
                            {isNewCategory && newCategoryForm}
                            {isInternationalExpense  && newInternationalExpense}
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
