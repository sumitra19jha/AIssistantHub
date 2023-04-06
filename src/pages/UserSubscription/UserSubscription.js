import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

import api from "./../../services/api"
import Sidebar from '../../components/Dashboard/Sidebar';
import './UserSubscription.css';



const UserSubscription = () => {
    const [subscriptionData, setSubscriptionData] = useState([]);

    useEffect(() => {
        api.get('/user/subscriptions')
            .then((response) => {
                console.log(response.data.subscriptions);
                setSubscriptionData(response.data.subscriptions);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="subscription-container">
            <Sidebar />
            <div className="subscription-content">
                <div className="subscription-btn-container">
                    <h2>Purchase History</h2>
                    <Button className="btn-purchase" size="lg">
                        Purchase Subscription
                    </Button>
                </div>
                <Table responsive striped bordered hover className="subscription-table">
                    <thead>
                        <tr>
                            <th>Date of Purchase</th>
                            <th>Subscription Plan</th>
                            <th>Billing Cycle</th>
                            <th>Payment Amount</th>
                            <th>Payment Status</th>
                            <th>Invoice</th>
                            <th>Renewal Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptionData.map((subscription) => (
                            <tr key={subscription.date} className={subscription.status.toLowerCase() === 'successful' ? 'success' : 'fail'}>
                                <td>{subscription.date}</td>
                                <td>{subscription.plan}</td>
                                <td>{subscription.cycle}</td>
                                <td>{subscription.amount}</td>
                                <td>{subscription.status}</td>
                                <td>
                                    <a href={subscription.invoice} target="_blank" rel="noopener noreferrer">
                                        View
                                    </a>
                                </td>
                                <td>{subscription.renewal}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </div>
        </div>
    );
};

export default UserSubscription;
