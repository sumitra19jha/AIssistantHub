import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';

import Tab from "./Tab";
import api from "./../../services/api";
import Sidebar from "../../components/Dashboard/Sidebar";
import { SubscriptionContext } from "../../context/SubscriptionContext";

import './UserSubscription.css';


const DataComponent = ({ subscriptionData }) => {
    return (
        <div className="table-container">
            <div className="table-header">
                <span>Started on</span>
                <span>AI Name</span>
                <span>Salary Cycle</span>
                <span>Salary</span>
                <span>Salary Status</span>
                <span>Resume</span>
            </div>
            {subscriptionData.map((subscription) => (
                <div key={subscription.date} className={"table-row"}>
                    <span>{subscription.date}</span>
                    <span>{subscription.name}</span>
                    <span>{subscription.cycle}</span>
                    <span>{subscription.salary}</span>
                    <span>{subscription.status}</span>
                    <span>
                        <a href={subscription.resume} target="_blank" rel="noopener noreferrer">
                            View
                        </a>
                    </span>
                </div>
            ))}
        </div>
    );
}


const AIComponent = ({ tableData }) => {
    return (
        <div className="table-container">
            <div className="table-header">
                <span>Name</span>
                <span>Description</span>
                <span>Status</span>
                <span>Resume</span>
            </div>
            {tableData.map((subscription) => (
                <div key={subscription.date} className={"table-row"}>
                    <span>{subscription.name}</span>
                    <span>{subscription.description}</span>
                    <span>{subscription.status}</span>
                    <span>
                        <a href={subscription.resume} target="_blank" rel="noopener noreferrer">
                            View
                        </a>
                    </span>
                </div>
            ))}
        </div>
    );
}

const UserSubscription = () => {
    const [activeTab, setActiveTab] = useState('all');
    const { subscriptionData, tableData, setSubscriptionData, setTableData } = useContext(SubscriptionContext);

    useEffect(() => {
        fetchSubscriptions();
        fetchAIDetails();
    }, []);


    const fetchSubscriptions = async () => {
        api.get(`/user/subscriptions`)
            .then((response) => {
                if (response.data.success) {
                    setSubscriptionData(response.data.subscriptions);
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                alert("Some issue occurred!");
            });
    };

    const fetchAIDetails = async () => {
        api.get(`/user/ai/details`)
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data.details)
                    setTableData(response.data.details);
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                alert("Some issue occurred!");
            });
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="subscription-container">
            <Sidebar />
            <div className="subscription-content">
                <div className="subscription-header">
                    <div className="header-content">
                        <h2 className="subscription-title">Purchase History</h2>
                        <Button variant="outline-primary" className="btn-purchase">
                            Purchase
                        </Button>
                    </div>
                    <div className="child-components">
                        <div className="child-1">
                            <Tab
                                title="All Purchase"
                                active={activeTab === 'all'}
                                onClick={() => handleTabClick('all')}
                            />
                            <Tab
                                title="AI Colleagues"
                                active={activeTab === 'successful'}
                                onClick={() => handleTabClick('successful')}
                            />
                        </div>
                        <div className="child-2">

                        </div>
                    </div>
                </div>
                {
                    activeTab === 'all' ?
                        <DataComponent subscriptionData={subscriptionData} /> :
                        <AIComponent tableData={tableData} />
                }
            </div>
        </div>
    );
};

export default UserSubscription;