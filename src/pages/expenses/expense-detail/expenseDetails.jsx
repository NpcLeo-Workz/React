import {useGetExpenses, useUpdateExpense} from "../../../api/expenseAPI.js";
import {useParams} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {useGetAllCategories} from "../../../api/categoryAPI.js";
import {useGetAllDeliveriesForExpense, useUpdateDelivery} from "../../../api/deliveriesAPI.js";

const ExpenseDetails = () => {
    const {id} = useParams()
    const {data: expense} = useGetExpenses({id})
    const {mutate: updateExpense}= useUpdateExpense()
    const [tempExpense, setTempExpense]= useState(expense)
    const {data: categories}= useGetAllCategories()
    const [isNewCategory, setIsNewCategory] = useState(false)
    const [newCategory, setNewCategory]=useState('')
    const {data: deliveries}= useGetAllDeliveriesForExpense({expenseId:id})
    const{mutate: updateDelivery}= useUpdateDelivery()
    const handleFormOnChange=(key, event)=>{
        let data = tempExpense

        data[key]= event.target.value
        console.log(data)
        setTempExpense(data)
    }
    const handleUpdateDelivery=(delivery)=>{
        const date = new Date()
        delivery.actualDeliveryDate=date
        console.log(delivery)
        updateDelivery(delivery)
    }
    const updateExpenseHandler=(event)=>{
        event.preventDefault()
        updateExpense(tempExpense)
    }
    const categoryHandler = (event)=>{
        if(event.target.value === "new"){
            setIsNewCategory(true)
            return
        }
        console.log(event.target.value)
        setIsNewCategory(false)
        handleFormOnChange('categoryId', event)
    }
    const getCategories=(
        <>
            {categories.map(cat=> {
                if(cat.id === expense.categoryId){
                    return (
                        <option key={cat.id} value={cat.id} selected>{cat.name}</option>)
                }
                return(
                <option key={cat.id} value={cat.id}>{cat.name}</option>)
            })}
        </>
    )
    const deliveryList=(
        <>
            <h3>Deliveries</h3>
            {deliveries.map(d => {
                return(
                <Row>
                    <Col>
                        <h3>{d.description}</h3>
                    </Col>
                    <Col>
                        <p>{d.price}</p>
                    </Col>
                    <Col>
                        <p>{d.expectedDeliveryDate.getDate()}/{d.expectedDeliveryDate.getMonth()}/{d.expectedDeliveryDate.getFullYear()}</p>
                    </Col>
                    <Col>
                        <Button onClick={()=>handleUpdateDelivery(d)} >delivered</Button>
                    </Col>
                </Row>)
            })}
        </>
    )
    const createCategoryHandler=(event)=>{
        event.preventDefault()
        const name = newCategory
        createNewCategory({name})
        setIsNewCategory(false)
    }
    const newCategoryForm=(
        <Form.Group className="mb-3">
            <Row>
                <Col>
                    <Form.Label>Username</Form.Label>
                </Col>
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
    const infoForm=(
        <>
            {Object.keys(tempExpense).map((key,index)=>{
                let show = false
                let val = tempExpense[key]
                let type = typeof(tempExpense[key])
                const editable = ['name', 'amount','date','description']
                if(editable.indexOf(key)>-1){
                    show = true
                }else if(key === 'category'||key === 'categoryId'){
                    return
                }
                if(key=== 'date'){
                    type = 'date'
                    val = tempExpense[key].toISOString().substring(0, 10)

                    // console.log(val)
                }
                return(
                    <Form.Group key={index}>
                        <Row>
                            <Col>
                                <Form.Label>{key}</Form.Label>
                            </Col>
                            <Col  md={8}>
                                {show &&
                                <Form.Control type={type} placeholder={val}
                                     onChange={e => handleFormOnChange(key, e)}
                                />}
                                {!show &&
                                    <Form.Label>{tempExpense[key].toString()}</Form.Label>
                                }
                            </Col>
                        </Row>
                    </Form.Group>
                )
            })}
        </>
    )
    return (
        <Container>
            <h1>{expense.name}</h1>
            <Form onSubmit={updateExpenseHandler}>
                {infoForm}
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Category</Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form.Select required onChange={categoryHandler}>
                                {getCategories}
                                <option value="new">add new category</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Form.Group>
                {isNewCategory && newCategoryForm}
                {deliveries && deliveryList}
                <Button variant="primary" type="submit">
                    update expense
                </Button>
            </Form>

            {/*show all data*/}
            {/*{<p>{expense?.name}</p>}*/}
            {/*{<p>{id}</p>}*/}
            {/*edit info*/}
        </Container>
    )
}

export default ExpenseDetails;
