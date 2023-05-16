import React from "react";
import styles from "./Services.module.css";

function Services() {
    return (
        <section id="services" className={styles.services}>
            <h2 className={styles.section_title}>Services</h2>
            <div className={styles.service_list}>
                <div className={styles.service_item}>
                    <div className={styles.service_card}>
                        <div className={styles.service_card_front}>
                            <h3>Research</h3>
                        </div>
                        <div className={styles.service_card_back}>
                            <p>High-quality research using advanced LLM technology</p>
                        </div>
                    </div>
                </div>
                <div className={styles.service_item}>
                    <div className={styles.service_card}>
                        <div className={styles.service_card_front}>
                            <h3>Content Creation</h3>
                        </div>
                        <div className={styles.service_card_back}>
                            <p>Create engaging content tailored for your social media platforms</p>
                        </div>
                    </div>
                </div>
                <div className={styles.service_item}>
                    <div className={styles.service_card}>
                        <div className={styles.service_card_front}>
                            <h3>Intenet Research</h3>
                        </div>
                        <div className={styles.service_card_back}>
                            <p>LLMs connected to internet to help you assist what to create.</p>
                        </div>
                    </div>
                </div>
                <div className={styles.service_item}>
                    <div className={styles.service_card}>
                        <div className={styles.service_card_front}>
                            <h3>Daily Pipelines</h3>
                        </div>
                        <div className={styles.service_card_back}>
                            <p>Create Pipeline to get daily emais for your content.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
