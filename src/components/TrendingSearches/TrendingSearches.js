import React from 'react';
import './TrendingSearches.css';

const TrendingSearches = () => {
    const searches = [
        { query: 'Dummy Search 1', value: '+100%' },
        { query: 'Dummy Search 2', value: '+80%' },
        // Add more dummy data as needed
    ];

    return (
        <div className="trending-searches">
            <h2>Trending Searches</h2>
            <ul className="trending-searches__list">
                {searches.map((search, index) => (
                    <li key={index} className="trending-searches__item">
                        <span className="trending-searches__query">{search.query}</span>
                        <span className="trending-searches__value">{search.value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrendingSearches;
