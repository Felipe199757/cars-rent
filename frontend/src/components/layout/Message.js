import { useEffect, useState } from "react";
import styles from "./Message.module.css"
import bus from "../../utils/bus";

function Message() {
    const [type, setType] = useState("")
    const [message, setMessage] = useState("")
    const [visibility, setVisibility] = useState(false)

    useEffect(() => {

        bus.addListener("flash", ({ message, type }) => {
            setVisibility(true)
            setMessage(message)
            setType(type)
setTimeout(()=>{
    setVisibility(false)
}, 4000)

        })

    }, [])

    return (
        visibility && (
            <div className={`${styles.message} ${styles[type]}`}>{message}</div>
        )
    );
}

export default Message;
