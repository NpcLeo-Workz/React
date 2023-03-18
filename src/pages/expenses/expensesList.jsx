import {useGetAllExpensesForMonth} from "../../api/expenseAPI.js";
import Expense from "./expense.jsx";

const ExpensesList = () => {
    const date = new Date()
    let month = date.getMonth()
    let year = date.getFullYear()

    const {data: expenses} = useGetAllExpensesForMonth({month, year})
    // console.log(expenses)
    return (
        <>
            {expenses.map(e => <Expense key={e?.id}{...e}/>)}
        </>
    )
}

export default ExpensesList;
