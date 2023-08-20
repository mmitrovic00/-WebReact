import React, { useState, useEffect } from 'react';
import {getOrderItems, getItems, cancelOrder, getOrders } from '../../api';

function AllOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders()
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
                    });
            })
            .catch((error) => {
                console.log(error);
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

    return (
        <div className='order-list-container'>
            <div className="order-list">
                <h2>Order List</h2>
                <ul>
                {orders.map((order) => ((
                        <li key={order.orderId}>
                            <p>Order ID: {order.orderId}</p>
                            <p>customer ID: {order.customerId}</p>

                            <p>Address: {order.address}</p>
                            <p>Comment: {order.comment}</p>
                            <p>Cost: {order.cost}$</p>
                            <p>Time of Delivery: {new Date(order.dateOfDelivery).toLocaleTimeString()}</p>
                            <p>Date of Delivery: {new Date(order.dateOfDelivery).toLocaleDateString()}</p>
                            <p>Date of Order: {new Date(order.dateOfOrder).toLocaleDateString()}</p>
                            <p>Time of Order: {new Date(order.dateOfOrder).toLocaleTimeString()}</p>
                            <p>Order Status: {getOrderStatusLabel(order.orderStatus)}</p>
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
        </div>
    );
}

export default AllOrders;
