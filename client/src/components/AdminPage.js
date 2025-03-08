import React from "react"
import { Redirect, Route } from "react-router-dom"

const AdminPage = () => {
    const accessLevel = sessionStorage.getItem("accessLevel")

if (accessLevel !== "2") {
    return <Redirect to="/"/>
}
return (
    <div>
        <h2>Welcome, Admin</h2>
    </div>
)
}
export default AdminPage