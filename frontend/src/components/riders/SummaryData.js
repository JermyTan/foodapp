import React, { useState, useEffect } from "react";
import Axios from "axios";

function SummaryData(setRiderSummary, period, id) {
    const [data, setData] = useState([]);
    const url1 = `http://localhost:5000/api/riders/${id}/summary`
    console.log(`url1 is: ${url1}`);
    useEffect(() => {
        Axios.get(url1)
            .then(response => {
                console.log("response", response.data);
                setRiderSummary(response.data);
            })
            .catch(error => {
                console.log("Error retrieving rider summary data:", error);
            })
    }, [])

    // const url2 = `http://localhost:5000/api/orders`
    // useEffect(() => {
    //     Axios.get(url2)
    //         .then(response => {
    //             console.log("response", response.data);
    //             setOrders(response.data);
    //         })
    //         .catch(error => {
    //             console.log("Error retrieving order data:", error);
    //         })
    // }, [])


}

export default SummaryData;