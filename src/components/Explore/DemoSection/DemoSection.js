import React from 'react';
import './DemoSection.css';
import { Segment, Header, Divider, Button, Icon } from 'semantic-ui-react';

const DemoSection = () => {
    return (
        <Segment basic className='demo-section'>
            <Header as='h2' className='demo-header'>See Our Platform in Action</Header>
            <div className='demo-video'>
                <iframe title='demo video' src='https://www.youtube.com/embed/dQw4w9WgXcQ' frameBorder='0' allowFullScreen />
            </div>
            <Divider />
            <Button primary size='huge' className='demo-button'>
                Schedule a Demo
                <Icon name='calendar alternate' />
            </Button>
        </Segment>
    );
};

export default DemoSection;