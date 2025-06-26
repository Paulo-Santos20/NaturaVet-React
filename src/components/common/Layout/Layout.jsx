import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import '../../../styles/components/Header.css';
import '../../../styles/components/Footer.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;