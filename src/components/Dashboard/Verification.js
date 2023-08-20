import { getSellers } from "../../api";
import { approveSeller, rejectSeller } from "../../api";
import React, { useState, useEffect } from 'react';

function Verification() {

    const [data, setData] = useState([]);

    useEffect(() => {
        getSellers()
            .then((response) => {
                const apiData = response.data;
                setData(apiData)
            })
            .catch((error) => {
                console.log(error)
            })

    }, []);

    const handleStatusChange = (email, newStatus) => {
        const apiFunction = newStatus === 'Approved' ? approveSeller : rejectSeller;
        apiFunction(email)
            .then(() => {
                // If the API request is successful, update the local state
                getSellers()
                .then((response) => {
                    const apiData = response.data;
                    setData(apiData)
                })
                .catch((error) => {
                    console.log(error)
                })
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="container">
          <h2>Sellers</h2>
          <div>
            {/* Render the data from the 'data' state */}
            {data.map((seller) => (
              <div key={seller.email} className="seller-item">
                <p className="username">{seller.userName}</p>
                {seller.approved === 0 ? (
                  <p className={`status approved`}>Approved</p>
                ) : seller.approved === 1 ? (
                  <p className={`status rejected`}>Rejected</p>
                ) : (
                  <div className="status-button-container">
                    <button
                      className="approve-button"
                      onClick={() => handleStatusChange(seller.email, 'Approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleStatusChange(seller.email, 'Rejected')}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
} 


export default Verification;