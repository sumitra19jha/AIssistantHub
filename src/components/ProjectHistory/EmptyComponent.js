import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faThumbsUp, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import './EmptyComponent.css';

const EmptyComponent = ({ handleSeoOptionClick, handleSocialMediaPostOptionClick }) => {

    return (
        <Container fluid className="empty-component-bg">
            <Container className="py-5">
                <h1 className="display-4">Welcome to AIssistant Hub</h1>
                {/* <p className="lead">
                    Here, you can generate content, analyze SEO, and leverage our
                    powerful Generative AI engine.
                </p> */}
                <Row className="features">
                    <Col md={4} className="feature">
                        <FontAwesomeIcon icon={faSearch} size="3x" />
                        <h3>SEO Analysis</h3>
                        <p>
                            AI which analyse video, news, your competitiors, maps, and social forums to improve your SEO.
                        </p>
                        <Button variant="primary" onClick={handleSeoOptionClick}>Analyze SEO</Button>
                    </Col>
                    <Col md={4} className="feature">
                        <FontAwesomeIcon icon={faThumbsUp} size="3x" />
                        <h3>Create Post Pipeline</h3>
                        <p>
                            Generate engaging posts using the latest hashtags, sentiment, and real time trends across industries. Our AI sends emails as well.
                        </p>
                        <Button variant="primary" onClick={handleSocialMediaPostOptionClick}>Create Post</Button>
                    </Col>
                    <Col md={4} className="feature">
                        <FontAwesomeIcon icon={faEnvelopeOpenText} size="3x" />
                        <h3>Pipeline</h3>
                        <p>
                            Receive email updates for your content, provide feedback, and improve your content strategy.
                        </p>
                        <Button variant="primary">Access Pipeline</Button>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default EmptyComponent;
