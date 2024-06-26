import React from "react";
import styles from "./ProductShowcase.module.css";

function ProductShowcase() {
    const productImages = [
        { src: "https://pigeon-website-images.s3.us-east-2.amazonaws.com/creator-ai.webp", title: 'Social Medial Creator', description: 'In production.' },
        { src: "https://pigeon-website-images.s3.us-east-2.amazonaws.com/research-ai.webp", title: 'Better Visibility', description: 'In development' },
        { src: "https://pigeon-website-images.s3.us-east-2.amazonaws.com/voice-ai.webp", title: 'Talk in your Voice', description: 'In Development' },
        { src: "https://pigeon-website-images.s3.us-east-2.amazonaws.com/coder-ai.webp", title: 'Microservice developer', description: 'In Ideation' },
    ];

    return (
        <section id="works" className={styles.product_showcase}>
            <h2 className={styles.section_title}>Our Exciting Field of Work</h2>
            <div className={styles.showcase_container}>
                {productImages.map((image, index) => (
                    <div>
                        <div key={index} className={styles.image_wrapper}>
                            <img src={image.src} alt={`Product Snapshot ${index + 1}`} />
                        </div>

                        <h3 className={styles.image_title}>{image.title}</h3>
                        <p className={styles.image_description}>{image.description}</p>
                    </div>

                ))}
            </div>
        </section>
    );
}

export default ProductShowcase;