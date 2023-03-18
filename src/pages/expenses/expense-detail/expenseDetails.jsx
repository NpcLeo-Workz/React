import {useGetExpenses} from "../../../api/expenseAPI.js";
import {useParams} from "react-router-dom";

const ExpenseDetails = () => {
    const {id} = useParams()
    const  {data: expense} = useGetExpenses({id})
    return (
        <>
            {<p>{expense?.name}</p>}
            {<p>{id}</p>}
        </>
    )
}

export default ExpenseDetails;
