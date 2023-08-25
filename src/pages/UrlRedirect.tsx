import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { IResponseData } from "@/models/IResponseData"
import { getEnv } from "@/utils/getEnv"

const UrlRedirect = () => {
    const { tag } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get<Partial<IResponseData>>(`${getEnv("server_url")}${getEnv("server_uri")}/${tag}`)
            .then((response) => {
                if(response.data.data)
                    window.location.replace(response.data.data)
                else
                    navigate("/invalid-url", { replace: true })
            })
            .catch(() => {
                navigate("/invalid-url", {
                    replace: true
                })
            })
    }, [])

    return <></>
}

export default UrlRedirect