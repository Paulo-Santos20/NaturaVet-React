import React from 'react';
import Hero from '../../components/features/Hero/Hero';
import Services from './components/How';
import About from './components/Aboutdoctor';
import Testimonials from '../../components/features/Testimonials/TestimonialsList';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Services />
      <About />
      <Testimonials />
    </div>
  );
};

export default Home;