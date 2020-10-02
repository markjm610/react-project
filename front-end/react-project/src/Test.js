import React from 'react'
import { apiBaseUrl } from './config';
const Test = () => {
    const click = async () => {
        const res = await fetch(`${apiBaseUrl}/users/test`, {
            method: 'POST',
            body: JSON.stringify({
                fields: {
                    project:
                    {
                        id: "18514",
                        key: 'JRACLOUD'
                    },
                    summary: "No REST for the Wicked.",
                    description: "Creating of an issue using ids for projects and issue types using the REST API",
                    issuetype: {
                        id: "3"
                    }
                }
            }),
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