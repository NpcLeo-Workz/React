import {NavLink} from "react-router-dom";
import ExpensesList from "./expensesList.jsx";

const Expenses = () => {
    return (
        <>
            <NavLink to="/expenses/newexpense">New Expense</NavLink>
            <ExpensesList/>
        </>
    )
}

export default Expenses;
