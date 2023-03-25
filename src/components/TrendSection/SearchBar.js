import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
    return (
        <div className="search-bar">
            <div className="search-bar-wrapper">
                <div className="search-bar-icon">
                    <div className="search-icon"></div>
                    <div className="microphone-icon"></div>
                </div>
                <div className="search-bar-input">
                    <div
                        className="search-input-wrapper"
                        data-explore-url="https://trends.google.com/trends/explore?q=Argentina%20vs%20Panama&amp;date=now%201-d&amp;geo=IN&amp;hl=en-US"
                        jsaction="click:V3VVS;keydown:UMuHjb;input:jbNU9b;focusin:JI2Hxc;focusout:NMzCWb"
                        jsname="E470yf"
                        jscontroller="EF8pe"
                        jsshadow=""
                    >
                        <label
                            className="search-label"
                            aria-label="Search"
                            htmlFor="search-input"
                            jsaction="click:cOuCgd; keydown:I481le;"
                            jsname="vhZMvf"
                            style={{
                                "--mdc-ripple-fg-size": "226px",
                                "--mdc-ripple-fg-scale": "1.72107",
                                "--mdc-ripple-fg-translate-start": "-30.624px, -79.0226px",
                                "--mdc-ripple-fg-translate-end": "75.4219px, -93px"
                            }}
                        >
                            <span className="search-label-icon"></span>
                            <input
                                id="search-input"
                                className="search-input"
                                type="text"
                                value=""
                                placeholder="Search"
                                jsname="YPqjbf"
                                jsaction="focus:AHmuwe;blur:O22p3e;input:YPqjbf; mousedown:UX7yZ; mouseup:lbsD7e; pointerdown:QJflP; pointerup:HxTfMe; touchstart:p6p2H; touchend:yfqBxc;"
                                data-retain-autocomplete=""
                                autoComplete="off"
                            />
                            <span className="search-label-ripple"></span>
                        </label>
                    </div>
                </div>
                <div className="search-bar-button-wrapper">
                    <div className="search-button" data-is-gm3-button="true" data-retain-autocomplete="">
                        <button className="search-button-label" jsname="LB2jkb" jsaction="click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc; touchcancel:JMtRjd; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef;mlnRJb:fLiPzd;">
                            <div className="search-button-icon"></div>
                            <div className="search-button-text">Explore</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
