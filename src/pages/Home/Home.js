import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Services from './Services';
import Testimonials from './Testimonials';
import ProductShowcase from './ProductShowcase';
import DiagonalDivider from "./DiagonalDivider";
import Footer from './../../components/Footer/Footer';

function Home({ setSession }) {
    return (
        <div style={{ minHeight: "100vh" }}>
            <Header setSession={setSession} />
            <Hero setSession={setSession} />
            <DiagonalDivider /> {/* Add the wave divider */}
            <Services />
            <DiagonalDivider /> {/* Add the wave divider */}
            <Testimonials />
            <DiagonalDivider /> {/* Add the wave divider */}
            <ProductShowcase />
            <Footer />
        </div>
    );
}

export default Home;