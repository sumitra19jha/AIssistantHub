import React from 'react';
import { Segment, Header, Grid, Image } from 'semantic-ui-react';
import "./UseCases.css"

const UseCases = ({ useCaseImages }) => {
    return (
        <div className='use-cases'>
            <Segment basic>
                <Header as='h1'>
                    Our Use Cases
                </Header>
                <Grid container columns={3} stackable>
                    {useCaseImages.map((useCase) => (
                        <Grid.Column key={useCase.title}>
                            <div className='image-wrapper'>
                                <Image src={useCase.image} size='medium' centered />
                                <div className='title-wrapper'>
                                    <Header
                                        as='h3'
                                        textAlign='center'
                                        style={{ marginBottom: '10px' }}
                                    >
                                        {useCase.title}
                                    </Header>
                                    <div className='description-wrapper'>
                                        <p>{useCase.description}</p>
                                    </div>
                                </div>
                            </div>
                        </Grid.Column>
                    ))}
                </Grid>
            </Segment>
        </div>
    );
};

export default UseCases;