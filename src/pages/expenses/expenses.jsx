import {NavLink} from "react-router-dom";
import ExpensesList from "./expensesList.jsx";

const Expenses = () => {
    return (
        <>
            <NavLink to="newexpense">New Expense</NavLink>
            <ExpensesList/>
        </>
    )
}

export default Expenses;
