import {useGetAllOpenDeliveries} from "../../api/deliveriesAPI.js";
import Delivery from "./delivery.jsx";

const DeliveriesList = () => {
    const  {data:deliveries}= useGetAllOpenDeliveries()

    return (
        <>
            {deliveries.map(d => <Delivery key={d?.id}{...d}/>)}
        </>
    )
}

export default DeliveriesList;
