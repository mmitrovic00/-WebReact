import { getItems, newOrder } from "../../api";
import React, { useState, useEffect } from 'react';

function NewOrder() {

    const [items, setData] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [comment, setComment] = useState('');
    const [address, setAddress] = useState('');
    const [orderMsg, setOrderMsg] = useState('')

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        let deliveryPrice = 200;
        cartItems.forEach((item) => {
            totalPrice += item.price * item.amount + deliveryPrice;
        });
        return totalPrice;
    };


    const totalPrice = calculateTotalPrice();


    const addToCart = (item) => {
        setCartItems((prevCartItems) => {
            const itemInCart = prevCartItems.find((i) => i.itemId === item.itemId);
            if (itemInCart) {
                const originalAmount = item.amount + itemInCart.amount;
                console.log('original  ', originalAmount)
                // Update the cart with increased amount
                const updatedCartItems = prevCartItems.map((i) =>
                    i.itemId === item.itemId && i.amount < originalAmount
                        ? { ...i, amount: i.amount + 1 }
                        : i
                );
                // Decrease the item's amount in the items list (if it's greater than 0)
                const updatedItems = items.map((i) =>
                    i.itemId === item.itemId && i.amount > 0 ? { ...i, amount: i.amount - 1 } : i
                );
                setData(updatedItems);
                return updatedCartItems;
            } else {
                if (item.amount > 0) {
                    // Add the item to the cart
                    const updatedCartItems = [...prevCartItems, { ...item, amount: 1 }];
                    // Decrease the item's amount in the items list (if it's greater than 0)
                    const updatedItems = items.map((i) =>
                        i.itemId === item.itemId && i.amount > 0 ? { ...i, amount: i.amount - 1 } : i
                    );
                    setData(updatedItems);
                    return updatedCartItems;
                } else {
                    return prevCartItems;
                }
            }
        });
    };


    const removeFromCart = (item) => {
        setCartItems((prevCartItems) => {
            const itemInCart = prevCartItems.find((i) => i.itemId === item.itemId);

            if (itemInCart) {
                if (itemInCart.amount === 1) {
                    const updatedCartItems = prevCartItems.filter((i) => i.itemId !== item.itemId);

                    const updatedItems = items.map((i) =>
                        i.itemId === item.itemId ? { ...i, amount: i.amount + 1 } : i
                    );

                    setData(updatedItems);

                    return updatedCartItems;
                } else if (itemInCart.amount > 1) {
                    const updatedCartItems = prevCartItems.map((i) =>
                        i.itemId === item.itemId ? { ...i, amount: i.amount - 1 } : i
                    );

                    const updatedItems = items.map((i) =>
                        i.itemId === item.itemId ? { ...i, amount: i.amount + 1 } : i
                    );

                    setData(updatedItems);

                    return updatedCartItems;
                }
            } else {
                return prevCartItems;
            }
        });
    };



    useEffect(() => {
        getItems()
            .then((response) => {
                const apiData = response.data;
                setData(apiData)
            })
            .catch((error) => {
                console.log(error)
            })

    }, []);


    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        console.log(formData);

        let body = {
            "customerId": localStorage.getItem('userEmail'),
            "address": address,
            "comment": comment,
            "cost": totalPrice,
            "time": 0,
            "dateOfDelivery": new Date(),
            "dateOfOrder": new Date(),
            "orderStatus": 0,
            "orderedItems": cartItems,
        }

        newOrder(body)
            .then((response) => {
                console.log(response)
                setOrderMsg(response.data)
            })
            .catch((error) => {
                console.log(error)
                setOrderMsg(error.response.data)
            })

    }

    return (
        <div className="item-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Chart</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.itemId} className="item-row">
                            <td className="item-id">{item.itemId}</td>
                            <td className="item-name">{item.itemName}</td>
                            <td className="item-amount">{item.amount}</td>
                            <td className="item-price">{item.price}</td>
                            <td className="item-description">{item.description}</td>
                            <td>
                                <button onClick={() => addToCart(item)}>+</button>
                                <button onClick={() => removeFromCart(item)}>-</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <form onSubmit={submit}>
                <div className="cart-list">
                    <h2>Cart</h2>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.itemId}>
                                {item.itemName} x {item.amount} = {item.amount * item.price}
                            </li>
                        ))}
                    </ul>
                    <h3>Total Price: with delivery {totalPrice}</h3>
                    <div>
                        <label htmlFor="comment">Comment:</label>
                        <input
                            type="text"
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    {/* Delivery Address */}
                    <div>
                        <label htmlFor="address">Delivery Address:</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit" style={{ width: '150px', height: '40px', fontSize: '18px' }}>
                            Order
                        </button>
                    </div>
                </div>
            </form>
            {orderMsg && (
                <div className="error-container">
                    <p className="error-message">{orderMsg}</p>
                </div>
            )}
        </div>

    );
}


export default NewOrder;