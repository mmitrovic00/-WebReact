import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Perform any client-side cleanup (e.g., clearing local storage, tokens, etc.)
    localStorage.removeItem('accessToken'); // Remove any access tokens stored in local storage

    // Redirect the user to the login page or any other non-privileged page
    window.location.href = '/login'; // Replace '/login' with your desired URL
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;





