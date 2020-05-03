import Axios from "axios";

function SavePromotion(value1, value2, value3, setCreateError, setCreateSuccessfully) {
    const url = `http://localhost:5000/api/promotions`
    return Axios.post(url, {
        sdatetime: value1,
        edatetime: value2,
        discount: value3
    })
        .then(response => {
            console.log("response", response.data)
            setCreateError(false)
            setCreateSuccessfully(true)
        })
        .catch(error => {
            console.log("Error creating promotion:", error)
            setCreateError(true)
            setCreateSuccessfully(false)
        })
}

export default SavePromotion;