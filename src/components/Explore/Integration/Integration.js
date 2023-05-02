import React from 'react';
import { Segment, Header, List, Image } from 'semantic-ui-react';
import './Integration.css';

const IntegrationPartners = ({ integrations }) => {
    return (
        <Segment className="explore__integrationPartners">
            <Header as="h2" textAlign="center" className="explore__integrationPartners__header">
                We Partner With These Leading Platforms
            </Header>
            <List horizontal relaxed className="explore__integrationPartners__list">
                {integrations.map((integration) => (
                    <List.Item key={integration.name} className="explore__integrationPartners__list-item">
                        <Image src={integration.logo} size="small" style={{ width: '100px', height: '100px', objectFit: 'contain' }}/>
                        <List.Content style={{ textAlign: 'center' }}>
                            <List.Header className="explore__integrationPartners__list-header">
                                {integration.name}
                            </List.Header>
                            <List.Description className="explore__integrationPartners__list-description">
                                {integration.description}
                            </List.Description>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </Segment>
    );
};

export default IntegrationPartners;