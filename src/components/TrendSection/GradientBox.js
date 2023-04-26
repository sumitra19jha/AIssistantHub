import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./GradientBox.css";
import laptopDashboardImage from "../../assets/laptop-dashboard-image.png";

const GradientBox = () => {
    const [keyword, setKeyword] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [isImageZoomed, setIsImageZoomed] = useState(false);

    const handleImageClick = () => {
        setIsImageZoomed(!isImageZoomed);
    };

    useEffect(() => {
        const fetchKeywords = async () => {
            try {
                api.get('/home/trends/keywords')
                    .then((response) => {
                        if (response.data.success) {
                            setKeywords(response.data.keywords);
                        } else {
                            console.log(response.data.message);
                        }
                    })
                    .catch((error) => {
                        console.log("Some issue occured!", error);
                    });
            } catch (error) {
                console.error("Error fetching keywords:", error);
            }
        };

        fetchKeywords();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setKeyword((prevKeyword) => {
                const index = (keywords.indexOf(prevKeyword) + 1) % keywords.length;
                return keywords[index];
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [keywords]);

    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    return (
        <>
            <div className="parent">
                <div className="gradient">
                    <div className="animation">
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="child1">
                        <div className="child2">
                            <div className="explore-what">Empower creativity with</div>
                            <div className="india-box">
                                <div className="india">Proton</div>
                            </div>
                            <div className="is-searching-for">your versatile <div className="india-box">Generative AI</div>.</div>
                        </div>
                        <div className="child3">
                            <div className="search-box">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={keyword}
                                    onChange={handleInputChange}
                                />
                                <button className="explore-btn">Explore</button>
                            </div>
                        </div>
                    </div>
                    <div className={isImageZoomed ? "laptop-image zoomed" : "laptop-image"} onClick={handleImageClick}>
                        <img src={laptopDashboardImage} alt="Laptop with dashboard" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default GradientBox;