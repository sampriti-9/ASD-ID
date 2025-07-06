import React, { useState } from 'react';
import './LandingPage.css';
import Login from './Login';
import Register from './Register';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const closeModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <div className="landing">
      <header>
        <h1>Welcome to Aspire</h1>
        <p>"Every child can learn, just not on the same day or in the same way." 🌈</p>

        <div className="btn-group">
          <button onClick={() => setShowLogin(true)}>Login</button>
          <button onClick={() => setShowRegister(true)}>Register</button>
        </div>
      </header>

      {(showLogin || showRegister) && <div className="overlay" onClick={closeModals}></div>}

      {showLogin && (
        <div className="modal">
          <Login close={closeModals} />
        </div>
      )}

      {showRegister && (
        <div className="modal">
          <Register close={closeModals} />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
