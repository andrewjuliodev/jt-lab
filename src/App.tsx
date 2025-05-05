// src/App.tsx with vertical section indicators and neumorphic elements
import React, { useState, useEffect } from 'react';
import IntroAnimation from './components/animations/IntroAnimation';
import Header from './components/Header';
import ServicesSection from './components/sections/ServicesSection';
import { PortfolioSection, ContactSection, AboutSection } from './components/sections/DummySections';
import VerticalSectionIndicator from './components/VerticalSectionIndicator.tsx';
import NeumorphicElements from './components/backgrounds/NeumorphicElements.tsx';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';

// Add subtle neumorphic background pattern
const NeumorphicBackground = styled.div<{ $darkMode: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  background-color: ${props => props.$darkMode ? 'rgb(30, 31, 31)' : '#f0f0f0'};
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${props => props.$darkMode 
      ? `radial-gradient(circle at 20% 30%, rgba(50, 50, 50, 0.1) 0%, transparent 20%),
         radial-gradient(circle at 80% 60%, rgba(50, 50, 50, 0.15) 0%, transparent 20%)`
      : `radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.7) 0%, transparent 25%),
         radial-gradient(circle at 80% 60%, rgba(255, 255, 255, 0.7) 0%, transparent 25%)`
    };
    opacity: 0.4;
    z-index: -9;
  }
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${props => props.$darkMode 
      ? 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23333333\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
      : 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23cccccc\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
    };
    opacity: 0.25;
    z-index: -8;
  }
`;

const AppContainer = styled.div<{ $darkMode: boolean }>`
  min-height: 100vh;
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
  
  // Sections array for vertical indicators
  const sections = ['services', 'portfolio', 'contact', 'about'];
  
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

  // Handle section click from vertical indicator
  const handleSectionClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
        {/* Neumorphic Background */}
        <NeumorphicBackground $darkMode={darkMode} />
        
        {/* Add floating neumorphic elements with medium density */}
        {mainContentVisible && (
          <NeumorphicElements 
            darkMode={darkMode}
            density="medium"
            animated={true}
          />
        )}
        
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
            />
            
            {/* Vertical Section Indicators */}
            <VerticalSectionIndicator
              sections={sections}
              activeSection={activeSection}
              darkMode={darkMode}
              onSectionClick={handleSectionClick}
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