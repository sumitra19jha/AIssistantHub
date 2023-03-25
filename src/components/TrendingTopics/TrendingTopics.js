import React from 'react';
import './TrendingTopics.css';

const TrendingTopics = () => {
    const topics = [
        { title: 'Dummy Topic 1', value: '+100%' },
        { title: 'Dummy Topic 2', value: '+80%' },
        // Add more dummy data as needed
    ];

    return (
        <div className="trending-topics">
            <h2>Trending Topics</h2>
            <ul className="trending-topics__list">
                {topics.map((topic, index) => (
                    <li key={index} className="trending-topics__item">
                        <span className="trending-topics__title">{topic.title}</span>
                        <span className="trending-topics__value">{topic.value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrendingTopics;
