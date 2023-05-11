import React from 'react';
import classes from './MapsSeoAnalysis.module.css';

const MapsSeoAnalysis = ({ mapsData, onCreateContent }) => {
  if (mapsData.loading) {
    return <p>Loading...</p>;
  }

  if (mapsData.error) {
    return <p>Error: {mapsData.error}</p>;
  }

  const renderMapItem = (map, index) => (
    <div key={index} className={classes.mapItem}>
      <a href={map.google_maps_url} target="_blank" rel="noopener noreferrer">
        <div className={classes.mapContent}>
          <h4 className={classes.mapTitle}>{map.name}</h4>
          <p className={classes.mapAddress}>{map.address}</p>
        </div>
      </a>
      <button className={classes.createContentButton} onClick={() => onCreateContent(map.name)}>
        Create Content
      </button>
    </div>
  );

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Maps SEO Analysis</h2>
      <div className={classes.mapList}>
        {mapsData.data.data.map(renderMapItem)}
      </div>
    </div>
  );
};

export default MapsSeoAnalysis;