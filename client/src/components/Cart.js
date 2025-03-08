import React, { Component } from "react";
import axios from "axios";

export default class Cart extends Component {
    constructor(props) {
        super(props);

        // Initialize state
        this.state = {
            items: [], // Stores the fetched items
            loading: true, // Tracks loading state
            error: null, // Stores error messages
        };
    }

    // Fetch items from the backend when the component mounts
    componentDidMount() {
        this.fetchItems();
    }

    // Function to fetch items from the backend
    fetchItems = async () => {
        try {
            const response = await axios.get("/api/checkout-items", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the user's token for authentication
                },
            });
            this.setState({ items: response.data, loading: false }); // Update state with fetched items
        } catch (error) {
            console.error("Error fetching checkout items:", error);
            this.setState({ error: "Failed to fetch checkout items. Please try again later.", loading: false });
        }
    };

    render() {
        const { items, loading, error } = this.state;

        return (
            <div className="checkout-container">
                <h1>Checkout</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : items.length > 0 ? (
                    <ul className="checkout-list">
                        {items.map((item) => (
                            <li key={item._id} className="checkout-item">
                                <h3>{item.name}</h3>
                                <p>Price: ${item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items found in your checkout.</p>
                )}
            </div>
        );
    }
}

