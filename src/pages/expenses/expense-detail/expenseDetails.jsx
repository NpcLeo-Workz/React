import {useGetExpenses} from "../../../api/expenseAPI.js";
import {useParams} from "react-router-dom";

const ExpenseDetails = () => {
    const {id} = useParams()
    const  {data: expense} = useGetExpenses({id})
    return (
        <>
            {/*show all data*/}
            {<p>{expense?.name}</p>}
            {<p>{id}</p>}
            {/*edit info*/}
        </>
    )
}

export default ExpenseDetails;
