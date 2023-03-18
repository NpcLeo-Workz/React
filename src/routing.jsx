import {Outlet, Route, Routes} from 'react-router-dom'
import Home from './pages/home/home.jsx'
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Deliveries from "./pages/deliveries/deliveries.jsx";
import Expenses from "./pages/expenses/expenses.jsx";
import NewExpense from "./pages/expenses/new-expense/newExpense.jsx";
import ExpenseDetails from "./pages/expenses/expense-detail/expenseDetails.jsx";
import Settings from "./pages/settings/settings.jsx";
import Login from "./pages/login/login.jsx";
const Routing = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/dashboard'} element={<Dashboard/>}/>
            <Route path={'/deliveries'} element={<Deliveries/>}/>
            <Route path={'/expenses'} element={<Outlet/>}>
                <Route index element={<Expenses/>}/>
                <Route path={'/expenses/newexpense'} element={<NewExpense/>}/>
                <Route path={'/expenses:id'} element={<ExpenseDetails/>}/>
            </Route>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/settings'} element={<Settings/>}/>
        </Routes>
    )
}

export default Routing;
