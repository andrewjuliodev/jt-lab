// src/App.tsx with direct theme toggle implementation
import React, { useState, useEffect } from 'react';
import IntroAnimation from './components/animations/IntroAnimation';
import FadeTransition, { ContentRevealer } from './components/animations/FadeTransition';
import Header from './components/Header';
import ServicesSection from './components/sections/ServicesSection';
import { PortfolioSection, ContactSection, AboutSection } from './components/sections/DummySections';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';

const AppContainer = styled.div<{ $darkMode: boolean }>`
  min-height: 100vh;
  background-color: ${props => props.$darkMode ? 'rgb(30, 31, 31)' : '#f0f0f0'};
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const App: React.FC = () => {
  // Animation sequence state
  const [introComplete, setIntroComplete] = useState(false);
  const [fadeTransitionActive, setFadeTransitionActive] = useState(false);
  const [mainContentVisible, setMainContentVisible] = useState(false);
  
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Load dark mode preference from localStorage on initial load
  useEffect(() => {
    console.log("Initial darkMode check from localStorage");
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
    }
  }, []);
  
  // Handle animation completion - improved transition timing
  const handleIntroComplete = () => {
    setIntroComplete(true);
    
    // First, show the overlay with a solid color
    setFadeTransitionActive(true);
    
    // Wait a brief moment before fading the overlay out
    setTimeout(() => {
      // Start fading out the overlay
      setFadeTransitionActive(false);
    }, 200); // Short delay before fade begins to ensure smooth transition
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
        console.log("Scroll detected, active section set to:", currentSection.id);
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

  // Direct toggle implementation that doesn't rely on a parameter
  const toggleTheme = () => {
    console.log("Theme toggle called in App component, current darkMode:", darkMode);
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode ? 'true' : 'false');
    console.log("Theme set to:", newDarkMode ? "dark" : "light");
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer $darkMode={darkMode}>
        {/* Show intro animation */}
        {!introComplete && (
          <IntroAnimation 
            onComplete={handleIntroComplete}
            onThemeToggle={(isDark) => {
              console.log("Theme toggle from intro animation:", isDark);
              setDarkMode(isDark);
              localStorage.setItem('darkMode', isDark ? 'true' : 'false');
            }}
            darkMode={darkMode}
          />
        )}
        
        {/* Improved fade transition overlay */}
        <FadeTransition 
          show={fadeTransitionActive}
          duration={0.8}
          backgroundColor={darkMode ? "#1e1f1f" : "#ffffff"}
          onComplete={() => {
            setMainContentVisible(true);
            setActiveSection('services');
          }}
        />
        
        {/* Show header and content after animation completes */}
        {mainContentVisible && (
          <>
            <ContentRevealer visible={mainContentVisible} delay={0.1}>
              <Header 
                darkMode={darkMode} 
                onToggleTheme={toggleTheme} 
                visible={true}
                activeSection={activeSection || undefined}
              />
            </ContentRevealer>
            
            <ContentRevealer visible={mainContentVisible}>
              {/* Include the sections but hide their headers */}
              <ServicesSection id="services" darkMode={darkMode} hideHeader={true} />
              <PortfolioSection id="portfolio" darkMode={darkMode} hideHeader={true} />
              <ContactSection id="contact" darkMode={darkMode} hideHeader={true} />
              <AboutSection id="about" darkMode={darkMode} hideHeader={true} />
            </ContentRevealer>
          </>
        )}
      </AppContainer>
    </>
  );
};

export default App;