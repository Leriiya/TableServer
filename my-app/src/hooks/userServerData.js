import axios from "axios"
import { useEffect, useState } from "react"


const UserServerData = ({ url, isButtonClick }) => {

    const [contactData, setContactData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getData = () => {

    }

    useEffect(() => {
        axios.get(url).then((res) => {
            // console.log(res)
            setContactData(res.data)
            setIsLoading(false)
        })
    }, [url])

    return [{ contactData, isLoading, setContactData, setIsLoading }, getData]
}



export default UserServerData