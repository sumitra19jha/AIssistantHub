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
            <div className="gradient_box">
                <div className="gradient_box__gradient">
                    <div className="gradient_box__animation">
                    </div>
                </div>
                <div className="gradient_box__content-wrapper">
                    <div className="gradient_box__tagline">
                        <div className="gradient_box__tagline_text">
                            <div className="gradient_box__tagline_text__explore-what">Unleashing Digital Genius: AI-driven</div>
                            <div className="gradient_box__tagline_text__india-box">
                                <div className="gradient_box__tagline_text__india">SEO, Blogs & Social Media.</div>
                            </div>
                            <div className="gradient_box__tagline_text__explore-what">You write the goals, we script the <div className="gradient_box__tagline_text__india-box">success!</div>.</div>
                        </div>
                        <div className="gradient_box__tagline__search">
                            <div className="gradient_box__tagline__search-box">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={keyword}
                                    onChange={handleInputChange}
                                />
                                <button className="gradient_box__tagline__explore-btn">Explore</button>
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