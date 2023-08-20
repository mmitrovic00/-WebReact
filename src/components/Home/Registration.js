import { useNavigate } from "react-router-dom";
import {useRecoilState} from "recoil";
import { isAuthAtom } from '../../utils/auth';
import React, { useState } from 'react';
import { registerUser } from '../../api';

function Registration() {

  const [errorMsg, setErrorMsg] = useState('')
  const [isAuth, setAuth] = useRecoilState(isAuthAtom)
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    localStorage.setItem('userEmail', formData.email);
    console.log(formData)

    let body = {

      "email": formData.get('email'),
      "username": formData.get('username'),
      "firstname": formData.get('firstname'),
      "lastname": formData.get('lastname'),
      "password": formData.get('password'),
      "birthday": formData.get("birthday"),
      "address": formData.get("address"),
      "imagePath": formData.get("imagePath"),
      "userType": parseInt(formData.get("userType"), 10)
    }

    registerUser(body)
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


  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

    return (
      <div className="container">
        <div className="login-form-container">
          <h2>Register</h2>
          <form onSubmit={submit}>
            <div style={{ margin: '5px' }}>email <input onChange={onInputChange} type='text' name="email" /></div>
            <div style={{ margin: '5px' }}>user name <input onChange={onInputChange} type='text' name="username" /></div>
            <div style={{ margin: '5px' }}>first name <input onChange={onInputChange} type='text' name="firstname" /></div>
            <div style={{ margin: '5px' }}>last name <input onChange={onInputChange} type='text' name="lastname" /></div>
            <div style={{ margin: '5px' }}>password <input onChange={onInputChange} type='password' name="password" /></div>
            <div style={{ margin: '5px' }}>birthday <input onChange={onInputChange} type='text' name="birthday" /></div>
            <div style={{ margin: '5px' }}>address <input onChange={onInputChange} type='text' name="address" /></div>
            <div style={{ marging: '5px' }}>imagePath<input onChange={onInputChange} type='text' name="imagePath" /></div>
            <div className='dropdown'>
              Select Role:
              <select value={selectedRole} onChange={handleRoleChange} name="userType">
                <option value={0}>Admin</option>
                <option value={1}>Customer</option>
                <option value={2}>Seller</option>
              </select>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button type="submit" style={{ width: '150px', height: '40px', fontSize: '18px' }}>
                Register
              </button>
            </div>
          </form>
          {errorMsg && (
                    <div className="error-container">
                        <p className="error-message">{errorMsg}</p>
                    </div>
                )}
          <div style={{ margin: '5px' }}>Already have an account? Go to <a href='/login'>Login</a></div>

        </div>
      </div>

    )
}
export default Registration;