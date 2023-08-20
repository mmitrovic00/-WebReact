import React, { useState } from 'react';
import { loginUser } from '../../api';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isAuthAtom } from '../../utils/auth';


function Login() {
    const [errorMsg, setErrorMsg] = useState('')
    const [isAuth, setAuth] = useRecoilState(isAuthAtom)
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        console.log(formData);
        let body = {
            "password": formData.get('password'),
            "email": formData.get('email')
        }
        loginUser(body)
            .then((response) => {
                console.log(response)
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userType', response.data.userType)

                localStorage.setItem('userEmail',formData.get('email'))
                setAuth(true)
                navigate("/dashboard")
            })
            .catch((error) => {
                console.log(error)
                setErrorMsg(error.response.data)
            })

    }

    const onInputChange = () => {
        setErrorMsg('')
    }

    return (
        <div className="container">
            <div className="login-form-container">
                <h2>Login</h2>
                <form onSubmit={submit}>
                    <div style={{ margin: '5px' }}>email <input onChange={onInputChange} type='text' name="email" /></div>
                    <div style={{ margin: '5px' }}>password <input onChange={onInputChange} type='password' name="password" /></div>
                    <div>
                        <button type="submit" style={{ width: '150px', height: '40px', fontSize: '18px' }}>
                            Login
                        </button>
                    </div>
                </form>
               {errorMsg && (
                    <div className="error-container">
                        <p className="error-message">{errorMsg}</p>
                    </div>
                )}

                <div style={{ margin: '5px' }}>Don't have an account? Go to <a href='/registration'>Registration</a></div>
            </div>
        </div>

    )
}

export default Login;