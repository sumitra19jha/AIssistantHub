// PricingPlans.js

import React from 'react';
import { Segment, Header, List, Icon, Button, Divider } from 'semantic-ui-react';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import './PricingPlans.css';

const PricingPlan = ({ name, price, features }) => (
    <div className='pricing-plan'>
        <Segment raised>
            
            <Header as='h3' className='pricing-plan__name'>
                {name}
            </Header>
            
            <Header as='h2' className='pricing-plan__price' style={{marginTop: "0em"}}>
                {price}
            </Header>

            <Divider />
            <List relaxed className='pricing-plan__features'>
                {features.map((feature) => (
                    <List.Item key={feature} className='pricing-plan__feature'>
                        <FaCheck color='green' style={{marginRight: "1em"}}/>
                        {feature}
                    </List.Item>
                ))}
            </List>
            <Divider />
            
            <Button primary size='huge' className='pricing-plan__button'>
                Get Started
                <FaArrowRight className='pricing-plan__icon' />
            </Button>
        </Segment>
    </div>
);

const PricingPlans = ({ pricingPlans }) => (
    <Segment basic className='pricing-plans'>
        <Header as='h2' textAlign='center' className='pricing-plans__header'>
            Pricing and Plans
        </Header>
        <div className='pricing-plans__list'>
            {pricingPlans.map((plan) => (
                <PricingPlan key={plan.name} {...plan} />
            ))}
        </div>
    </Segment>
);

export default PricingPlans;
