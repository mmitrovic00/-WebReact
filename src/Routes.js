import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Home/Login';
import Home from './components/Home/Home';
import Registration from './components/Home/Registration';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Dashboard/Profile';
import PasswordChange from './components/Dashboard/PasswordChange';
import { useRecoilState } from 'recoil';
import { isAuthAtom } from './utils/auth';
import { getTokenExpiration } from './utils/auth';
import useAuth from './utils/useAuth'; // Import the useAuth hook
import Verification from './components/Dashboard/Verification';
import AddItem from './components/Dashboard/AddItem';
import NewOrder from './components/Dashboard/NewOrder';
import PreviousOrders from './components/Dashboard/PreviousOrders';
import AllOrders from './components/Dashboard/AllOrders';
import MyOrders from './components/Dashboard/MyOrders';
import NewOrders from './components/Dashboard/NewOrder';
import PendingOrders from './components/Dashboard/PendingOrders';

// Custom ProtectedRoute wrapper function to handle protected routes


const AppRoutes = () => {
    const [isAuth, setAuth] = useRecoilState(isAuthAtom);

    useEffect(() => {
        const tokenExpiration = getTokenExpiration();
        console.log(tokenExpiration)
        const currentTime = Date.now();
        if (tokenExpiration && currentTime > tokenExpiration) {
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            setAuth(false)
            window.location.href = '/login';
        }
    }, [isAuth]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route index element={<h1>home</h1>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                </Route>

                <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" />}>
                    {/* Nested route for the profile page under /dashboard */}
                    <Route index element={<h1>dashboard</h1>} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="passwordChange" element={<PasswordChange/>}/>
                    <Route path="verification" element={<Verification/>}/>
                    <Route path="addItem" element={<AddItem/>}/>
                    <Route path="newOrder" element={<NewOrder/>}/>
                    <Route path="previousOrders" element={<PreviousOrders/>}/>
                    <Route path="allOrders" element={<AllOrders/>}/>
                    <Route path="myOrders" element={<MyOrders/>}/>
                    <Route path="pendingOrders" element={<PendingOrders/>}/>

                </Route>
            </Routes>
        </Router>
    )
};

export default AppRoutes;