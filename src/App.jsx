import React, { useEffect, useState, useCallback } from 'react';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';
import Intro from './components/Intro';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Menu from './components/Menu';
import Reviews from './components/Reviews';
import Process from './components/Process';
import Footer from './components/Footer';
import Legal from './components/Legal';
import WhatsAppButton from './components/WhatsAppButton';
import ConsentManager from './components/ConsentManager';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  useEffect(() => {
    if (showIntro) return; // Wait until intro is done

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('.section, .service-card, .menu-item-card, .process-step, .review-card').forEach((el) => {
      el.classList.add('fade-in-section');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [showIntro]);

  return (
    <LanguageProvider>
      {showIntro && <Intro onComplete={handleIntroComplete} />}
      <div className="app">
        <Header onNavigate={() => setCurrentPage('home')} />

        {currentPage === 'home' ? (
          <main>
            <Hero />
            <Services />
            <Menu />
            <Reviews />
            <Process />
          </main>
        ) : (
          <Legal page={currentPage} onBack={() => setCurrentPage('home')} />
        )}

        <Footer onNavigate={setCurrentPage} />

        {/* Global floating WhatsApp Button */}
        <WhatsAppButton />

        {/* DSGVO Consent Manager (AdBlock-safe) */}
        <ConsentManager />
      </div>
    </LanguageProvider>
  );
}

export default App;
