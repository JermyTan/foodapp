// import React, { useState, useEffect } from "react";
// import { Menu, Container, Card, Button } from "semantic-ui-react";
// import Axios from "axios";

// function getCustomers() {
//     const [customersData, setCustomersData] = useState([]);

//     const url = `http://localhost:5000/api/promotions`
//     useEffect(() => {
//         Axios.get(url)
//             .then(response => {
//                 console.log("response", response.data)
//                 setCustomersData(response.data)
//             })
//             .catch(error => {
//                 console.log("Error retrieving promotions:", error);
//             })
//     }, [url])
// }
