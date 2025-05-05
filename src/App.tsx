// src/App.tsx
import React, { useState, useEffect } from 'react';
import IntroAnimation from './components/animations/IntroAnimation';
import Header from './components/Header';
import ServicesSection from './components/sections/ServicesSection';
import { PortfolioSection, ContactSection, AboutSection } from './components/sections/DummySections';
import styled from 'styled-components';

const AppContainer = styled.div<{ $darkMode: boolean }>`
  min-height: 100vh;
  background-color: ${props => props.$darkMode ? 'rgb(30, 31, 31)' : '#fff'};
  color: ${props => props.$darkMode ? '#fff' : '#000'};
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const Content = styled.div<{ $introComplete: boolean }>`
  opacity: ${props => props.$introComplete ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
`;

const App: React.FC = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
    }
  }, []);
  
  // Handle theme toggle
  const handleThemeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode ? 'true' : 'false');
  };
  
  // Handle intro animation completion
  const handleIntroComplete = () => {
    setIntroComplete(true);
    // Set initial active section after intro completes
    setActiveSection('services');
  };

  // Track active section based on scroll position
  useEffect(() => {
    if (!introComplete) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('section[id]');
      
      // Find the section currently in view
      const currentSection = Array.from(sections).find(section => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionBottom = sectionTop + section.getBoundingClientRect().height;
        
        // Add a small offset to the top to prevent the header from changing too soon
        const offset = 100;
        
        // Section is in view if scroll position is within its boundaries (with offset)
        return scrollPosition >= sectionTop - offset && scrollPosition < sectionBottom;
      });
      
      // Set active section based on the current section in view
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    // Call once on mount to set initial active section
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [introComplete]);

  return (
    <AppContainer $darkMode={darkMode}>
      {/* Show intro animation when the app first loads */}
      {!introComplete && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}
      
      {/* Show header and content after intro animation completes */}
      {introComplete && (
        <>
          <Header 
            darkMode={darkMode} 
            onToggleTheme={handleThemeToggle} 
            visible={true}
            activeSection={activeSection || undefined}
            initialRender={false} // Disable initial bullet animation in App.tsx
          />
          
          <Content $introComplete={introComplete}>
            {/* Include the sections */}
            <ServicesSection id="services" darkMode={darkMode} />
            <PortfolioSection id="portfolio" darkMode={darkMode} />
            <ContactSection id="contact" darkMode={darkMode} />
            <AboutSection id="about" darkMode={darkMode} />
          </Content>
        </>
      )}
    </AppContainer>
  );
};

export default App;