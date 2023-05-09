import React from 'react';
import classes from '../SearchAnalysis.module.css';

const NewsSeoAnalysis = ({ newsData, suggestionTitles, onCreateContent }) => {
  if (newsData.loading) {
    return <p>Loading...</p>;
  }

  if (newsData.error) {
    return <p>Error: {newsData.error}</p>;
  }

  const renderNewsItem = (news, index) => (
    <div key={index} className={classes.newsItem}>
      <a href={news.link} target="_blank" rel="noopener noreferrer">
        <div className={classes.newsImage}>
          <img
            src={
              news.pagemap?.cse_thumbnail?.[0]?.src ||
              'https://via.placeholder.com/150x100'
            }
            alt={news.htmlTitle}
          />
        </div>
        <div className={classes.newsContent}>
          <h4 className={classes.newsTitle}>{news.title}</h4>
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
      <h2 className={classes.title}>News SEO Analysis</h2>
      <div className={classes.newsList}>
        {newsData.data.data.slice(0, 5).map(renderNewsItem)}
        <button className={classes.showMoreButton}>Show more</button>
      </div>
      <h3 className={classes.suggestionTitle}>Suggested Titles:</h3>
      <div className={classes.suggestionList}>
        {suggestionTitles.map(renderSuggestionItem)}
      </div>
    </div>
  );
};

export default NewsSeoAnalysis;