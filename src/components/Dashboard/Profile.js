import React, { useState, useEffect } from 'react';
import { getUser } from '../../api';
import { updateUser } from '../../api';
import { useNavigate } from "react-router-dom";
import HeaderDash from './HeaderDash';

function ProfileForm (){

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        userName: '',
        firstName: '',
        lastName: '',
        birthday: '',
        address: '',
        imagePath: '',
    });
    useEffect(() => {
        getUser()
            .then((response) => {
                console.log(response)
                setFormData(response.data);
            })
    }, []);

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
        // Add the logic to update user data on the backend
        console.log('Form submitted:', formData);
        let body = {
            "email": formData.email,
            "username": formData.userName,
            "firstname": formData.firstName,
            "lastname": formData.lastName,
            "birthday": formData.birthday,
            "address": formData.address,
            "imagePath": formData.imagePath
          }
      
          updateUser(body)
            .then((response) => {
              console.log(response)
              navigate("dashboard/profile")
            })
            .catch((error) => {
              console.log(error)
            })
    };

    const [isEditMode, setIsEditMode] = useState(false);
    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
      };

    return (
       
        <div className="container">
            <div className="login-form-container">
                <h2>Profile</h2>
                <form onSubmit={submit}>
                    <div style={{ margin: '5px' }}>email <input onChange={onInputChange} type='text' name="email" value={formData.email} disabled={!isEditMode}/></div>
                    <div style={{ margin: '5px' }}>user name <input onChange={onInputChange} type='text' name="userName" value={formData.userName} disabled={!isEditMode}/></div>
                    <div style={{ margin: '5px' }}>first name <input onChange={onInputChange} type='text' name="firstName" value={formData.firstName} disabled={!isEditMode} /></div>
                    <div style={{ margin: '5px' }}>last name <input onChange={onInputChange} type='text' name="lastName" value={formData.lastName} disabled={!isEditMode}/></div>
                    <div style={{ margin: '5px' }}>birthday <input onChange={onInputChange} type='text' name="birthday" value={formData.birthday} disabled={!isEditMode}/></div>
                    <div style={{ margin: '5px' }}>address <input onChange={onInputChange} type='text' name="address" value={formData.address} disabled={!isEditMode}/></div>
                    <div style={{ margin: '5px' }}>imagePath<input onChange={onInputChange} type='text' name="imagePath" value={formData.imagePath} disabled={!isEditMode}/></div>
                    <div style={{ textAlign: 'center' }}>
                        <button type="button" style={{ width: '100px', height: '30px', fontSize: '14px' }} onClick={toggleEditMode}>
                            Change
                        </button>
                        <button type="submit" style={{ width: '100px', height: '30px', fontSize: '14px' }} >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileForm;