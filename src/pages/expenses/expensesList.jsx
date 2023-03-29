import {useGetAllExpensesForMonth} from "../../api/expenseAPI.js";
import Expense from "./expense.jsx";
import {Alert, Col, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import {useGetAllCategories} from "../../api/categoryAPI.js";
import SettingsContext from "../../context/settingsContext.jsx";

const ExpensesList = () => {
    const {budget} = useContext(SettingsContext)
    const [date, setDate] = useState(new Date())
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    const  currentDate = date.toISOString().slice(0, 7)
    const {data: expenses} = useGetAllExpensesForMonth({month, year})
    const {data:  categories} =  useGetAllCategories()
    const  {listByCategory} = useContext(SettingsContext)
    const allExpensesMonthly=(
        expenses.map(e => <Expense key={e?.id}{...e}/>)
    )
    const expensesByCategory= []
    categories.map(cat=>{
        expensesByCategory.push(expenses.filter(e=>e.categoryId === cat.id).map(e => <Expense key={e?.id}{...e}/>))
        }
    )

    const budgetError=(
        <Alert  className="alert-danger">
            Total expenses: € {expenses.map(e=>e.amount).reduce((x,y)=>x+y,0)} is over the budget: €{budget}
        </Alert>
    )
    return (
        <>
            {expenses.map(e=>e.amount).reduce((x,y)=>x+y,0)>budget && budgetError}
            <Row>
                <input type="month" required="required" value={currentDate} onChange={e => setDate(new Date(e.target.value))}/>
            </Row>
            {!listByCategory && allExpensesMonthly}

            {listByCategory &&<><Row>{categories.map(cat=><Col key={cat?.id} className="col-sm"><h3>{cat.name}</h3></Col>)}</Row>
                <Row>{expensesByCategory.map(exp=> <Col key={exp} className="col-sm">{exp}</Col>)}</Row></> }

            {/* show if expenses is higher then budget  */}

        </>
    )
}

export default ExpensesList;
