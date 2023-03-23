import {useGetAllExpensesForYear} from "../../api/expenseAPI.js";
import {Line} from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement,LineElement,Title,Tooltip,Legend} from "chart.js";
import {useGetAllCategories} from "../../api/categoryAPI.js";
import {Col, Row} from "react-bootstrap";
import {useGetAllOpenDeliveries} from "../../api/deliveriesAPI.js";

const Dashboard = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )
    const year = new Date().getFullYear()//needs to become dynamic
    const {data: expenses} = useGetAllExpensesForYear({year})
    const {data:  categories} =  useGetAllCategories()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",  "Jul", "Aug", "Sep","Oct","Nov","Dec"]
    const expPerMonth = []
    const expPerMonthCat = []
    const  {data:deliveries}= useGetAllOpenDeliveries()
    const randColor = () =>  {
        return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
    }
    for(let i = 0; i<months.length; i++){
        expPerMonth.push(expenses.map(e=>e.date.getMonth()).filter(v=>v === i).length)
    }
    categories.map(cat=>{
        let exppermonth= []
        let color = randColor()
        for(let i = 0; i<months.length; i++){
            exppermonth.push(expenses.filter(e=>e.categoryId === cat.id).map(e=>e.date.getMonth()).filter(v=>v === i).length)
        }
        expPerMonthCat.push(
            {
                label: `${cat.name}`,
                data: exppermonth,
                backgroundColor: color,
                borderColor: color
            }
        )
    })
    const dataMonthlyExpense={
        labels: months,
        datasets: [
            {
                label: `Monthly expenses year: ${year}`,
                data: expPerMonth,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    }
    const dataMonthlyExpenseCategory={
        labels: months,
        datasets: expPerMonthCat
    }

    return (
        <div>
            <Row>
                <Col>
                    <Line data={dataMonthlyExpense}/>

                </Col>
                <Col>
                    <Line data={dataMonthlyExpenseCategory}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Deliveries not yet delivered: {deliveries.length}</p>
                </Col>
                <Col>
                    <p>Deliveries over Time: {deliveries.filter(d=>d.expectedDeliveryDate<= new Date()).length}</p>
                </Col>
            </Row>
        </div>


    )
}

export default Dashboard;
