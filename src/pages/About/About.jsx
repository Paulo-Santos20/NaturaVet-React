import React from 'react';
import DoctorHero from './components/DoctorHero';
import ProfessionalJourney from './components/ProfessionalJourney';
import Stats from './components/Stats';
import Education from './components/Education';
import Philosophy from './components/Philosophy';
import Specializations from './components/Specializations';
import './components/About.css';

const About = () => {
  return (
    <div className="about-page">
      <DoctorHero />
      <ProfessionalJourney />
      <Stats />
      <Education />
      <Philosophy />
      <Specializations />
    </div>
  );
};

export default About;