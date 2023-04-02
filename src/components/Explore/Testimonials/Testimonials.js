import React from 'react';
import { Segment, Header, Card, Image } from 'semantic-ui-react';
import "./UseCases.css"


const testimonials = [
    { name: 'John Doe', title: 'Marketing Manager', photo: './review-1.jpg', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et velit leo.' },
    { name: 'Jane Smith', title: 'Content Writer', photo: './review-2.jpg', text: 'Ut luctus metus quis est ultricies, sit amet finibus risus rutrum.' },
    { name: 'Bob Johnson', title: 'Social Media Manager', photo: './review-1.jpg', text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.' },
];

const Testimonials = () => {
    return (
        <Segment basic>
            <Header as='h2' textAlign='center' style={{ color: '#555555', marginBottom: '50px' }}>What Our Customers Say</Header>
            <Card.Group itemsPerRow={3} centered>
                {testimonials.map((testimonial) => (
                    <Card key={testimonial.name} className="testimonial-card">
                        <div className="testimonial-image-container">
                            <Image src={testimonial.photo} size='medium' className="testimonial-image" />
                        </div>
                        <Card.Content className="testimonial-content">
                            <Card.Header className="testimonial-name" style={{ color: '#555555' }}>{testimonial.name}</Card.Header>
                            <Card.Description className="testimonial-text" style={{ color: '#555555' }}>{testimonial.text}</Card.Description>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </Segment>
    )
}

export default Testimonials;