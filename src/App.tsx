// src/App.tsx
import React, { useState, useEffect } from 'react';
import IntroAnimation from './components/animations/IntroAnimation';
import Header from './components/Header';
import ServicesSection from './components/sections/ServicesSection';
import { PortfolioSection, ContactSection, AboutSection } from './components/sections/DummySections';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';

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
  // Animation sequence state
  const [introComplete, setIntroComplete] = useState(false);
  const [mainContentVisible, setMainContentVisible] = useState(false);
  
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
  const handleThemeToggle = (isDarkMode: boolean) => {
    setDarkMode(isDarkMode);
    localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
  };
  
  // Handle animation completion
  const handleIntroComplete = () => {
    setIntroComplete(true);
    setTimeout(() => {
      setMainContentVisible(true);
      setActiveSection('services');
    }, 300);
  };

  // Set initial body class when the component mounts
  useEffect(() => {
    document.body.classList.add('intro-active');
    
    // Cleanup function
    return () => {
      document.body.classList.remove('intro-active');
      document.body.classList.remove('intro-complete');
    };
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    if (!mainContentVisible) return;

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
  }, [mainContentVisible]);

  // When main content becomes visible, update body class to show scrollbar
  useEffect(() => {
    if (mainContentVisible) {
      document.body.classList.remove('intro-active');
      document.body.classList.add('intro-complete');
    }
  }, [mainContentVisible]);

  return (
    <>
      <GlobalStyle />
      <AppContainer $darkMode={darkMode}>
        {/* Show intro animation */}
        {!introComplete && (
          <IntroAnimation 
            onComplete={handleIntroComplete}
            onThemeToggle={handleThemeToggle}
            darkMode={darkMode}
          />
        )}
        
        {/* Show header and content after animation completes */}
        {mainContentVisible && (
          <>
            <Header 
              darkMode={darkMode} 
              onToggleTheme={() => handleThemeToggle(!darkMode)} 
              visible={true}
              activeSection={activeSection || undefined}
              initialRender={true}
            />
            
            <Content $introComplete={mainContentVisible}>
              {/* Include the sections */}
              <ServicesSection id="services" darkMode={darkMode} />
              <PortfolioSection id="portfolio" darkMode={darkMode} />
              <ContactSection id="contact" darkMode={darkMode} />
              <AboutSection id="about" darkMode={darkMode} />
            </Content>
          </>
        )}
      </AppContainer>
    </>
  );
};

export default App;