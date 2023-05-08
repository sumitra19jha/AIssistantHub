import React from 'react';
import classes from './SearchAnalysis.module.css';

const SearchAnalysis = ({ searchData, suggestionTitles, onCreateContent }) => {
  if (searchData.loading) {
    return <p>Loading...</p>;
  }

  if (searchData.error) {
    return <p>Error: {searchData.error}</p>;
  }

  const renderNewsItem = (search, index) => (
    <div key={index} className={classes.newsItem}>
      <a href={search.link} target="_blank" rel="noopener noreferrer">
        <div className={classes.newsImage}>
          <img
            src={
                search.pagemap?.cse_thumbnail?.[0]?.src ||
              'https://via.placeholder.com/150x100'
            }
            alt={search.htmlTitle}
          />
        </div>
        <div className={classes.newsContent}>
          <h4 className={classes.newsTitle}>{search.title}</h4>
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
        {searchData.data.data.slice(0, 3).map(renderNewsItem)}
        <button className={classes.showMoreButton}>Show more</button>
      </div>
      <h3 className={classes.suggestionTitle}>Suggested Titles:</h3>
      <div className={classes.suggestionList}>
        {suggestionTitles.map(renderSuggestionItem)}
      </div>
    </div>
  );
};

export default SearchAnalysis;