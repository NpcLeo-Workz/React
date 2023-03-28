import {useCreateExpense} from "../../../api/expenseAPI.js";
import {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import ResponseMessage from "../../../utils/responseMessage.jsx";
import FormSubmitButtonWithLoading from "../../../utils/formSubmitButtonWithLoading.jsx";
import {useNavigate} from "react-router-dom";
import {useCreateCategory, useGetAllCategories} from "../../../api/categoryAPI.js";
import {useCreateCurrency, useGetAllCurrencies} from "../../../api/currencyAPI.js";
import Delivery from "../../deliveries/delivery.jsx";
import {useCreateDelivery} from "../../../api/deliveriesAPI.js";
import expenses from "../expenses.jsx";

const NewExpense = () => {
    const [name,  setName]  = useState('')
    const [amount, setAmount] = useState(1)
    const [originalCurrencyId,  setOriginalCurrencyId] = useState(0)
    const [originalCurrencyAmount, setOriginalCurrencyAmount] = useState(1)
    const [date, setDate] = useState(new Date())
    const [categoryId, setCategoryId] = useState(1)
    const [description, setDescription] = useState('')
    const {data: newExpense,mutate: createNewExpense, isSuccess} = useCreateExpense()
    const {mutate: createNewCategory}= useCreateCategory()
    const {mutate:  createNewCurrency}= useCreateCurrency()
    const {mutate: createNewDelivery}=useCreateDelivery()
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
    const[deliveryDescription,setDeliveryDescription]= useState('')
    const [price,setPrice]=useState(1)
    const[expectedDeliveryDate,setExpectedDeliveryDate]=useState(new Date())
    const [newDeliveries, setNewDeliveries]= useState([])
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
        console.log({
            name,
            amount,
            originalCurrencyId,
            originalCurrencyAmount,
            date,
            categoryId,
            description})
        createNewExpense({
            name,
            amount,
            originalCurrencyId,
            originalCurrencyAmount,
            date,
            categoryId,
            description})

    }
    if(isSuccess){
        if(isDeliverToHome){
            newDeliveries.map(delivery=>
                {
                    const deliv ={
                        description: delivery.description,
                        expenseId: newExpense.id,
                        price: delivery.price,
                        expectedDeliveryDate: delivery.expectedDeliveryDate,
                    }
                    createNewDelivery(deliv)
                 }
           )
            setIsDeliverToHome(false)
        }
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
    const addDeliveryToList=()=>{
        const delivery={
            description: deliveryDescription,
            price:  price,
            expectedDeliveryDate: expectedDeliveryDate
        }
        setNewDeliveries(d=> [...d, delivery])
    }
    const getCategories=(
        <>
            {categories.map(cat=> <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </>
    )
    const  getCurrencies=(
        <>
            {currencies.map(cur=><option key={cur.id} value={cur.id}>{cur.name}</option>)}
        </>
    )
    const getDeliveriesFromList=(
        <>
            {newDeliveries.map((d, index) => <Delivery key={index}{...d}/>)}
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
            <Form.Select required onChange={currencyHandler} >
                <option value="choose" disabled selected>
                    -- Select currency --
                </option>
                {getCurrencies}
                <option value="new">add new currency</option>
            </Form.Select>
        </Form.Group>
        <Form.Group>
            <Form.Label>Original Currency Amount</Form.Label>
            <Form.Control type="number" required placeholder="enter original currency amount" value={originalCurrencyAmount}
                          onChange={e => setOriginalCurrencyAmount(parseInt(e.target.value))}/>
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
    const newHomeDelivery=(
        <>
            <h3>Deliveries</h3>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Delivery Description</Form.Label>
                        <Form.Control type="text" required placeholder="enter description" value={deliveryDescription}
                                      onChange={e => setDeliveryDescription(e.target.value)}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Delivery Price</Form.Label>
                        <Form.Control type="number" required placeholder="price" value={price}
                                      onChange={e => setPrice(parseInt(e.target.value))}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicDate">
                        <Form.Label>Expected Delivery Date</Form.Label>
                        <Form.Control type="date" required
                                      onChange={e => setExpectedDeliveryDate(new Date(e.target.value)) }/>
                    </Form.Group>
                </Col>
                <Col>
                    <Button variant="primary" onClick={addDeliveryToList}>
                        Add Delivery
                    </Button>
                </Col>
            </Row>
            <Row>
                {getDeliveriesFromList}
            </Row>

        </>
    )
    return (
        <Container className="d-flex flex-column vh-100">
            <Row>
                <h2>New Expense</h2>
            </Row>
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
                                    <option value="choose" disabled selected>
                                        -- Select category --
                                    </option>
                                    {getCategories}
                                    <option value="new">add new category</option>
                                </Form.Select>
                            </Form.Group>
                            {isNewCategory && newCategoryForm}
                            {isInternationalExpense  && newInternationalExpense}
                            {isDeliverToHome && newHomeDelivery}
                            {/*make option Home Delivery: for each: price, deliveryDate, description */}
                            <Form.Group className="mb-3" controlId="formBasicAmount">
                                <Form.Label>description *optional</Form.Label>
                                <Form.Control type="text" placeholder="description" value={description}
                                              onChange={e => setDescription(e.target.value)}/>
                            </Form.Group>
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
