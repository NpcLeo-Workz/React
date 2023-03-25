import {useGetAllExpensesForMonth} from "../../api/expenseAPI.js";
import Expense from "./expense.jsx";
import {Row} from "react-bootstrap";
import {useState} from "react";

const ExpensesList = () => {
    const [date, setDate] = useState(new Date())
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    const  currentDate = date.toISOString().slice(0, 7)
    const {data: expenses} = useGetAllExpensesForMonth({month, year})
    return (
        <>
            <Row>
                <input type="month" required="required" value={currentDate} onChange={e => setDate(new Date(e.target.value))}/>
            </Row>
            {expenses.map(e => <Expense key={e?.id}{...e}/>)}
            {/* show multiple based on category*/}
            {/* show if expenses is higher then budget  */}
        </>
    )
}

export default ExpensesList;
