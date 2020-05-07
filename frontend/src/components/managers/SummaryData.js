import React, { useState, useEffect } from "react";
import { MonthRangeInput } from "semantic-ui-calendar-react";
import {
    parse,
    isBefore,
    format,
    getUnixTime,
    startOfMonth,
    endOfMonth,
    differenceInCalendarMonths,
    differenceInCalendarWeeks,
} from "date-fns";
import Axios from "axios";

function SummaryData(setOrders, setCustomerOrder, setOrderSummary, setRiderSummary, startime, endtime) {
    const [period, setPeriod] = useState([]);
    // const url1 = `http://localhost:5000/api/customers`
    // useEffect(() => {
    //     Axios.get(url1)
    //         .then(response => {
    //             console.log("response", response.data);
    //             setCustomers(response.data);
    //         })
    //         .catch(error => {
    //             console.log("Error retrieving customer data:", error);
    //         })
    // }, [])

    const url2 = `http://localhost:5000/api/orders`
    useEffect(() => {
        Axios.get(url2)
            .then(response => {
                console.log("response", response.data);
                setOrders(response.data);
            })
            .catch(error => {
                console.log("Error retrieving order data:", error);
            })
    }, [])

    // const url3 = `http://localhost:5000/api/riders`
    // useEffect(() => {
    //     Axios.get(url3)
    //         .then(response => {
    //             console.log("response", response.data)
    //             setRiders(response.data)
    //         })
    //         .catch(error => {
    //             console.log("Error retrieving rider data:", error);
    //         })
    // }, [])

    const url4 = `http://localhost:5000/api/managers/summary/customers`
    useEffect(() => {
        Axios.get(url4)
            .then(response => {
                console.log("response", response.data)
                setCustomerOrder(response.data)
            })
            .catch(error => {
                console.log("Error retrieving customer data:", error);
            })
    }, [])

    // const url5 = `http://localhost:5000/api/managers/summary/orders/filtered?start=${start}&end=${end}`
    // useEffect(() => {
    //     Axios.get(url5)
    //         .then(response => {
    //             console.log("response", response.data);
    //             setOrderSummaryFiltered(response.data);
    //         })
    //         .catch(error => {
    //             console.log("Error retrieving filtered order data:", error);
    //         })
    // }, [])

    const url6 = `http://localhost:5000/api/managers/summary/orders`
    useEffect(() => {
        Axios.get(url6)
            .then(response => {
                console.log("response", response.data);
                setOrderSummary(response.data);
            })
            .catch(error => {
                console.log("Error retrieving order data:", error);
            })
    }, [])

    const url7 = `http://localhost:5000/api/managers/summary/riders?starttime=${startime}&endtime=${endtime}`;
    useEffect(() => {
        Axios.get(url7)
            .then(response => {
                let { ridersummary } = response.data;
                console.log(ridersummary);
                setRiderSummary(ridersummary);
            })
            .catch(error => {
                console.log("Error retrieving rider summary data:", error);
            })
    }, [])

}

export default SummaryData;