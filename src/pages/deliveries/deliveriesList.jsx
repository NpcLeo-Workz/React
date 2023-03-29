import {useGetAllOpenDeliveries} from "../../api/deliveriesAPI.js";
import Delivery from "./delivery.jsx";
import {Row} from "react-bootstrap";

const DeliveriesList = () => {
    const  {data:deliveries}= useGetAllOpenDeliveries()

    return (
        <>
            {deliveries.map(d => <Delivery key={d?.id}{...d}/>)}
        </>
    )
}

export default DeliveriesList;
