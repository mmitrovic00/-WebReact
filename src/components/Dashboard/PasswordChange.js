import React, { useState } from 'react';
import { changePassword } from '../../api';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isAuthAtom } from '../../utils/auth';


function PasswordChange() {
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        console.log(formData);
        let body = {
            "oldPassword": formData.get('oldPassword'),
            "newPassword": formData.get('newPassword'),
            "email": formData.get('email')
        }
        changePassword(body)
            .then((response) => {
                console.log(response)
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
                <h2>Change password</h2>
                <form onSubmit={submit}>
                    <div style={{ margin: '5px' }}>email <input onChange={onInputChange} type='text' name="email" /></div>
                    <div style={{ margin: '5px' }}>old password <input onChange={onInputChange} type='password' name="oldPassword" /></div>
                    <div style={{ margin: '5px' }}>new password <input onChange={onInputChange} type='password' name="newPassword" /></div>
                    <div>
                        <button type="submit" style={{ width: '150px', height: '40px', fontSize: '18px' }}>
                            Submit
                        </button>
                    </div>
                </form>
                <div>{errorMsg}</div>
            </div>
        </div>

    )
}

export default PasswordChange;