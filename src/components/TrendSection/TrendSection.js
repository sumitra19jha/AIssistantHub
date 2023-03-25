import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TrendsSection.css';

const TrendsSection = () => {
  const [trendsData, setTrendsData] = useState([]);

  const fetchTrendsData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/home/trends/keywords');
      const data = await response.json();
      console.log(data)
      setTrendsData(data.trends);
    } catch (error) {
      console.error('Error fetching trends data:', error);
    }
  };

  useEffect(() => {
    fetchTrendsData();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false, // added autoplay setting
    autoplaySpeed: 2000, // added autoplaySpeed setting
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="trends-section">
      <div className="trends-section__content">
        <h2>Recently Trending</h2>
        <div className="trends-section__items">
          <Slider {...sliderSettings}>
            {trendsData.map((trend, index) => (
              <div key={index} className="trends-section__item">
                <div className="trends-section__item-image-container">
                  <img
                    src={trend.image}
                    alt={trend.title}
                    className="trends-section__item-image"
                    width="500" // set desired width of image
                    height="500" // set desired height of image
                  />
                  <div className="trends-section__item-overlay">
                    <h3>{trend.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default TrendsSection;

