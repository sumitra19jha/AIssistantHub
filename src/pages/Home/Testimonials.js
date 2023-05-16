import React from "react";
import styles from "./Testimonials.module.css";

function Testimonials() {
    return (
        <section id="testimonials" className={styles.testimonials}>
            <h2 className={styles.section_title}>Testimonials</h2>
            <div className={styles.testimonial_list}>
                {/* Add more testimonial items as required */}
                <div className={styles.testimonial_item}>
                    <p>"Amazing research and content creation services! Highly recommended."</p>
                    <span>- Sumitra</span>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
