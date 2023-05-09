import React from 'react';
import classes from '../SearchAnalysis.module.css';

const CompetitorAnalysis = ({ compData, suggestionTitles, onCreateContent }) => {
  if (compData.loading) {
    return <p>Loading...</p>;
  }

  if (compData.error) {
    return <p>Error: {compData.error}</p>;
  }

  const renderNewsItem = (comp, index) => (
    <div key={index} className={classes.newsItem}>
      <a href={comp.link} target="_blank" rel="noopener noreferrer">
        <div className={classes.newsImage}>
          <img
            src={
              comp.pagemap?.cse_thumbnail?.[0]?.src ||
              'https://via.placeholder.com/150x100'
            }
            alt={comp.htmlTitle}
          />
        </div>
        <div className={classes.newsContent}>
          <h4 className={classes.newsTitle}>{comp.title}</h4>
        </div>
      </a>
    </div>
  );

  const renderSuggestionItem = (title, index) => (
    <div key={index} className={classes.suggestionItem}>
      <span>{title}</span>
      <button
        className={classes.createContentButton}
        onClick={() => onCreateContent(title)}
      >
        Create Content
      </button>
    </div>
  );

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Search SEO Analysis</h2>
      <div className={classes.newsList}>
        {compData.data.data.slice(0, 5).map(renderNewsItem)}
        <button className={classes.showMoreButton}>Show more</button>
      </div>
      <h3 className={classes.suggestionTitle}>Suggested Titles:</h3>
      <div className={classes.suggestionList}>
        {suggestionTitles.map(renderSuggestionItem)}
      </div>
    </div>
  );
};

export default CompetitorAnalysis;