import { createContext, useState } from 'react';

const SubscriptionContext = createContext();

const SubscriptionProvider = ({ children }) => {
    const [subscriptionData, setSubscriptionData] = useState([]);
    const [tableData, setTableData] = useState([]);

    return (
        <SubscriptionContext.Provider value={{ subscriptionData, tableData, setSubscriptionData, setTableData }}>
            {children}
        </SubscriptionContext.Provider>
    );
};

export { SubscriptionContext, SubscriptionProvider };