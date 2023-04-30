import React, { useState, useEffect, useContext } from 'react';
import { FaBars } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';

import Tab from "./Tab";
import useSession from '../../components/useToken';
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
            </div>
            {subscriptionData.map((subscription) => (
                <div key={subscription.date} className={"table-row"}>
                    <span>{subscription.date}</span>
                    <span>{subscription.name}</span>
                    <span>{subscription.cycle}</span>
                    <span>{subscription.salary}</span>
                    <span>{subscription.status}</span>
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
    const session = useSession();
    const [activeTab, setActiveTab] = useState('all');
    const { subscriptionData, tableData, setSubscriptionData, setTableData } = useContext(SubscriptionContext);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);

    const toggleMobileSidebar = () => {
        setShowMobileSidebar(!showMobileSidebar);
    };

    useEffect(() => {
        fetchSubscriptions();
        fetchAIDetails();
    }, []);


    const fetchSubscriptions = async () => {
        api.get(`/user/subscriptions`, {
            headers: {
                "Authorization": `Bearer ${session.session}`
            }
        })
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
        api.get(`/user/ai/details`, {
            headers: {
                "Authorization": `Bearer ${session.session}`
            }
        })
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data.details)
                    setTableData(response.data.details);
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                console.log(error)
                alert(error);
            });
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="user-subscription">
            <Sidebar showMobileSidebar={showMobileSidebar} toggleMobileSidebar={toggleMobileSidebar} />

            <div className="user-subscription__subscription-content">
                <div className="dashboard__ai-selection">
                    <div className="dashboard__hamburger-icon" onClick={toggleMobileSidebar}>
                        <FaBars />
                    </div>
                    <Button variant="outline-primary" className="user-subscription__btn-purchase">
                        Purchase
                    </Button>
                </div>

                <div className="user-subscription__header">

                    <div className="user-subscription__header-content">
                        <h2 className="user-subscription__subscription-title">Purchase History</h2>
                    </div>

                    <div className="user-subscription__tab-components">
                        <div className="user-subscription__tab-components__tab1">
                            <Tab
                                title="Purchase"
                                active={activeTab === 'all'}
                                onClick={() => handleTabClick('all')}
                            />
                            <Tab
                                title="AGIs"
                                active={activeTab === 'successful'}
                                onClick={() => handleTabClick('successful')}
                            />
                        </div>
                        <div className="user-subscription__tab-components__conatiner" />
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