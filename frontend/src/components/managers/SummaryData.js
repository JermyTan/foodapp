import React, { useState, useEffect } from "react";
import Axios from "axios";

function SummaryData(setCustomers, setOrders, setRiders, setCustomerOrder) {
    const url1 = `http://localhost:5000/api/customers`
    useEffect(() => {
        Axios.get(url1)
            .then(response => {
                console.log("response", response.data)
                setCustomers(response.data)
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
                setOrders(response.data)
            })
            .catch(error => {
                console.log("Error retrieving order data:", error);
            })
    }, [])

    const url3 = `http://localhost:5000/api/riders`
    useEffect(() => {
        Axios.get(url3)
            .then(response => {
                console.log("response", response.data)
                setRiders(response.data)
            })
            .catch(error => {
                console.log("Error retrieving rider data:", error);
            })
    }, [])

    const url4 = `http://localhost:5000/api/managers/summary`
    useEffect(() => {
        Axios.get(url4)
            .then(response => {
                console.log("response", response.data)
                setCustomerOrder(response.data)
            })
            .catch(error => {
                console.log("Error retrieving customer and order data:", error);
            })
    }, [])

}

export default SummaryData;