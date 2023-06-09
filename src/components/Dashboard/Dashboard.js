import React, { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import ProjectHistory from "../ProjectHistory/ProjectHistory";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);
    const toggleMobileSidebar = () => {
        setShowMobileSidebar(!showMobileSidebar);
    };

    return (
        <div>
            <div className={styles.dashboard}>
                <Sidebar
                    showMobileSidebar={showMobileSidebar}
                    toggleMobileSidebar={toggleMobileSidebar}
                />
                <div className={styles.dashboard__dashboard_main}>
                    <Header />
                    <div className={styles.dashboard__dashboard_content}>
                        <div className={styles.dashboard__dashboard_documents}>
                            <ProjectHistory />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;