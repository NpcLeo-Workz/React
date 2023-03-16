import {useNavigate} from "react-router-dom";

const Expense = ({id, name, amount, date}) => {
    const navigate = useNavigate()
    return (
        <div className="expense">
            <h3>{name}</h3>
            <p>{amount}</p>
            <p>{date.getDay()}/{date.getMonth()}/{date.getFullYear()}</p>
            {id && <button onClick={()=> navigate(id)}>Details</button>}
        </div>
    )
}

export default Expense;
