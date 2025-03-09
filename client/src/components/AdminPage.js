import React from "react"
import {Redirect} from "react-router-dom"

const AdminPage = () => {
    const accessLevel = sessionStorage.getItem("accessLevel")

    if (accessLevel !== "2") {
        return <Redirect to="/"/>
    }
    return (
        <div className="admin-page">
            <div className="welcome-box">
                <h2>Welcome, Admin</h2>
            </div>

            <div className="admin-sections">
                <section className="user-management">
                    <h3>User Management</h3>
                    <button>View All Users</button>
                    <button>Edit User Roles</button>
                    <button>Delete Users</button>
                </section>

                <section className="product-management">
                    <h3>Product Management</h3>
                    <button>Add New Product</button>
                    <button>Edit Products</button>
                    <button>Delete Products</button>
                </section>

                <section className="order-management">
                    <h3>Order Management</h3>
                    <button>View All Orders</button>
                    <button>Update Order Status</button>
                    <button>Cancel Orders</button>
                </section>

                <section className="analytics">
                    <h3>Sales and Analytics</h3>
                    <button>Generate Sales Report</button>
                    <button>View Product Performance</button>
                    <button>View Customer Insights</button>
                </section>
            </div>
        </div>
    )
}
export default AdminPage