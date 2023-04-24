import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="nucleus">
                {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className={`electron electron-${i + 1}`}></div>
                ))}
                
            </div>
            <h1 className="loading-text">Generating content...</h1>
        </div>
    );
};

export default LoadingScreen;
