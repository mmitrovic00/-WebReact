import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getUser } from '../../api';

function HeaderDash() {

    const [userType, setUserType] = useState(null); // State to store userType
    const [userStatus, setUserStatus] = useState(null); // State to store userType

    useEffect(() => {
        // Get the userType from local storage and set it in the state
        const userTypeFromStorage = parseInt(localStorage.getItem('userType'), 10);
        setUserType(userTypeFromStorage);

        getUser()
            .then((response) => {
                console.log(response)
                const approvedStatus = response?.data?.approved; // Access response.data.approved
                setUserStatus(approvedStatus);
                console.log(response.data.approved)
            })
    }, []); // Run this effect only once when the component mounts

    const nav = useNavigate();
    const handleLogout = () => {
        // Perform the logout process here (e.g., clear tokens, session, etc.)
        // For example:
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('userEmail');
        nav('/login');
    };

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <div className="buttons">
                <button className="button" onClick={handleLogout}>Log Out</button>
                <button className="button" onClick={() => nav('profile')}> Profile </button>
                <button className="button" onClick={() => nav('passwordChange')}> Change password </button>
                {userType === 0 && <button className='button' onClick={() => nav('verification')} >Verification</button>}
                {userType === 0 && <button className='button' onClick={() => nav('allOrders')}>All orders</button>}
                {userType === 1 && <button className='button' onClick={() => nav('newOrder')}>New order </button>}
                {userType === 1 && <button className='button' onClick={() => nav('previousOrders')}>Previous orders</button>}
                {userType === 2 && userStatus === 1 && <p>Your account has been rejected.</p>}
                {userType === 2 && userStatus === 2 && <p>Your account is currently in process.</p>}
                {userType === 2 && userStatus === 0 && <button className='button' onClick={() => nav('addItem')}>Add item</button>}
                {userType === 2 && userStatus === 0 && <button className='button' onClick={() => nav('pendingOrders')}>Pending</button>}
                {userType === 2 && userStatus === 0 && <button className='button' onClick={() => nav('myOrders')}>My orders</button>}

            </div>
        </div>
    );


}
export default HeaderDash;