import React, { useState, useEffect } from 'react';
import { getOrderByCustomer, getOrderItems, getItems, cancelOrder } from '../../api';

function PreviousOrders() {
    const [orders, setOrders] = useState([]);
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        getOrderByCustomer()
            .then((response) => {
                const apiData = response.data;

                const ordersWithItemNamesPromises = apiData.map(async (order) => {
                    const orderedItemsResponse = await getOrderItems(order.orderId);
                    const orderedItemsWithDetails = orderedItemsResponse.data.map(async (orderedItem) => {
                        const itemsResponse = await getItems();
                        const matchingItem = itemsResponse.data.find((item) => item.itemId === orderedItem.itemId);
                        return { ...orderedItem, itemName: matchingItem.itemName };
                    });
                    const orderedItemsWithNames = await Promise.all(orderedItemsWithDetails);
                    return { ...order, orderedItems: orderedItemsWithNames };
                });

                Promise.all(ordersWithItemNamesPromises)
                    .then((ordersWithItems) => {
                        setOrders(ordersWithItems);
                        
                    })
                    .catch((error) => {
                        console.log(error);
                        setErrorMsg(error.response.data)
                    });
            })
            .catch((error) => {
                console.log(error);
                setErrorMsg(error.response.data)
            });
    }, []);
    const getOrderStatusLabel = (status) => {
        switch (status) {
            case 0:
                return 'DELIVERED';
            case 1:
                return 'IN_PROGRESS';
            case 2:
                return 'CANCELED';
            default:
                return 'UNKNOWN';
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            // Call the API method to cancel the order
            const response = await cancelOrder(orderId);
            console.log('Order canceled:', response.data);
            setErrorMsg(response.data)
            // Update the orders list (if needed)
            // You might want to refetch the orders or update the state to reflect the canceled order
        } catch (error) {
            console.error('Error canceling order:', error);
            setErrorMsg(error.response.data)
        }
    };

    return (
        <div className='order-list-container'>
            <div className="order-list">
                <h2>Order List</h2>
                <ul>
                {orders.map((order) => (
                    // Check if the order status is not "CANCELED"
                    order.orderStatus !== 2 && (
                        <li key={order.orderId}>
                            <p>Order ID: {order.orderId}</p>
                            <p>Address: {order.address}</p>
                            <p>Comment: {order.comment}</p>
                            <p>Cost: {order.cost}$</p>
                            <p>Time of Delivery: {new Date(order.dateOfDelivery).toLocaleTimeString()}</p>
                            <p>Date of Delivery: {new Date(order.dateOfDelivery).toLocaleDateString()}</p>
                            <p>Date of Order: {new Date(order.dateOfOrder).toLocaleDateString()}</p>
                            <p>Time of Order: {new Date(order.dateOfOrder).toLocaleTimeString()}</p>
                            <p>Order Status: {getOrderStatusLabel(order.orderStatus)}</p>
                            {/* Show the "Cancel Order" button only if the order is in progress */}
                            {order.orderStatus === 1 && (
                                <button onClick={() => handleCancelOrder(order.orderId)}>Cancel Order</button>
                            )}
                            <p>Ordered Items:</p>
                            <ul>
                                {order.orderedItems.map((item) => (
                                    <li key={item.orderItemId}>
                                        <p>Item ID: {item.itemId}</p>
                                        <p>Item Name: {item.itemName}</p>
                                        <p>Amount: {item.amount}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )
                ))}
            </ul>
            </div>
            {errorMsg && (
                    <div className="error-container">
                        <p className="error-message">{errorMsg}</p>
                    </div>
                )}
        </div>
    );
}

export default PreviousOrders;
