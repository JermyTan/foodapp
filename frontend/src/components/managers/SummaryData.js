import React, { useState, useEffect } from "react";
import Axios from "axios";

function SummaryData(setCustomersCount, setOrdersCount) {
    const url1 = `http://localhost:5000/api/customers`
    useEffect(() => {
        Axios.get(url1)
            .then(response => {
                console.log("response", response.data)
                setCustomersCount(response.data)
            })
            .catch(error => {
                console.log("Error retrieving customer data:", error);
            })
    }, [])

    const url2 = `http://localhost:5000/api/orders`
    useEffect(() => {
        Axios.get(url2)
            .then(response => {
                console.log("response", response.data)
                setOrdersCount(response.data)
            })
            .catch(error => {
                console.log("Error retrieving order data:", error);
            })
    }, [])

}

export default SummaryData;