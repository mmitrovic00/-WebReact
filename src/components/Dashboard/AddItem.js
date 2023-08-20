import React, { useState } from 'react';
import { addItem } from '../../api';


function AddItem() {
    const [errorMsg, setErrorMsg] = useState('')

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Check if required fields are filled
        const itemName = formData.get('itemName');
        const price = formData.get('price');
        const amount = formData.get('amount');
        if (!itemName || !price || !amount) {
            setErrorMsg('Please fill in all required fields.');
            return;
        }
    }

    const onInputChange = () => {
        setErrorMsg('')
    }

    return (
        <div className="container">
            <div className="login-form-container">
                <h2>Add item</h2>
                <form onSubmit={submit}>
                    <div style={{ margin: '5px' }}>Name <input onChange={onInputChange} type='text' name="itemName" /></div>
                    <div style={{ margin: '5px' }}>Price <input onChange={onInputChange} type='text' name="price" /></div>
                    <div style={{ margin: '5px' }}>Amount <input onChange={onInputChange} type='text' name="amount" /></div>
                    <div style={{ margin: '5px' }}>Description <input onChange={onInputChange} type='text' name="description" /></div>
                    <div>
                        <button type="submit" style={{ width: '150px', height: '40px', fontSize: '18px' }}>
                            Submit
                        </button>
                    </div>
                </form>
                {errorMsg && (
                    <div className="error-container">
                        <p className="error-message">{errorMsg}</p>
                    </div>
                )}
            </div>
        </div>

    )
}

export default AddItem;