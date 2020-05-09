import React, { useState, useEffect } from "react";
import Axios from "axios";

function SummaryData(setRiderSummary, setSalary, setSchedule, setOrders, id) {
    const [data, setData] = useState([]);
    const url1 = `http://localhost:5000/api/riders/${id}/summary`
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

    const url2 = `http://localhost:5000/api/riders/${id}/salary`
    useEffect(() => {
        Axios.get(url2)
            .then(response => {
                console.log("response", response.data);
                setSalary(response.data);
            })
            .catch(error => {
                console.log("Error retrieving order data:", error);
            })
    }, [])

    const url3 = `http://localhost:5000/api/riders/${id}/schedule`
    useEffect(() => {
        Axios.get(url3)
            .then(response => {
                console.log("response", response.data);
                setSchedule(response.data);
            })
            .catch(error => {
                console.log("Error retrieving rider schedule:", error);
            })
    }, [])

    const url4 = `http://localhost:5000/api/riders/${id}/order`
    useEffect(() => {
        Axios.get(url4)
            .then(response => {
                console.log("response", response.data);
                setOrders(response.data);
            })
            .catch(error => {
                console.log("Error retrieving rider's order data:", error);
            })
    }, [])

}

export default SummaryData;