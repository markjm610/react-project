import React from 'react'
import { apiBaseUrl } from './config';
const Test = () => {
    const click = async () => {
        const res = await fetch(`${apiBaseUrl}/users/test`, {
            method: 'POST',
            body: JSON.stringify({ request: 'request' }),
            headers: {
                "Content-Type": 'application/json',
            }
        })
        const parsedRes = await res.json()
        console.log(parsedRes)
    }
    return (
        <button onClick={click}></button>
    )
}

export default Test