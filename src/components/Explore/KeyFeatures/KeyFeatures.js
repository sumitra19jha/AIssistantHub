import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import styled from 'styled-components';
import "./KeyFeatures.css"

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    width: 120px;
    background-color: #f5f5f5;
    border-radius: 50%;
`;

const FeatureIcon = styled.div`
    font-size: 48px;
    color: #333;
`;

const FeatureHeader = styled.h3`
    font-size: 28px;
    font-weight: bold;
    color: #333;
    margin-top: 30px;
    margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
    font-size: 20px;
    color: #666;
    line-height: 1.5;
`;

const KeyFeatures = ({featureIcons}) => {
    return (
        <Segment basic className="key-features">
            <Header as="h2" textAlign="center" className="title">
                Key Features
            </Header>
            <div className="key-feature-container">
                <div className="key-feature-list">
                    {featureIcons.map((feature) => (
                        <div className="key-feature-item" key={feature.name}>
                                <IconWrapper>
                                    <FeatureIcon>
                                        <feature.icon />
                                    </FeatureIcon>
                                </IconWrapper>
                                <FeatureHeader>{feature.name}</FeatureHeader>
                                <FeatureDescription>{feature.description}</FeatureDescription>
                        </div>
                    ))}
                </div>
            </div>
        </Segment>
    );
};

export default KeyFeatures;