import axios from "axios"
import { useEffect, useState } from "react"


const UserServerData = ({ url }) => {

    const [contactData, setContactData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    

    useEffect(() => {
        axios.get(url).then((res) => {
            // console.log(res)
            setContactData(res.data)
            setIsLoading(false)
            
        })
    }, [url])

    return [{ contactData, isLoading, setContactData, setIsLoading }]
}



export default UserServerData