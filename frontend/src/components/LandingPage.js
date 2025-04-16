import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login'); // Redirect to Login Page
    };

    return (
        <div className="landing-page">
            <div className="landing-page-content">
                <h1>Welcome to Interactive Memory Map</h1>
                <p>Pin your memories and share them with the world.</p>
                <button className="get-started-button" onClick={handleGetStarted}>
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
