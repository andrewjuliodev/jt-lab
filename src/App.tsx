// Updated App.tsx with rearranged sections and Home section
import React, { useState, useEffect } from 'react';
import IntroAnimation from './components/animations/IntroAnimation';
import FadeTransition, { ContentRevealer } from './components/animations/FadeTransition';
import Header from './components/Header';
import ServicesSection from './components/sections/ServicesSection';
import PortfolioSection from './components/sections/PortfolioSection';
import ContactSection from './components/sections/ContactSection';
import AboutSection from './components/sections/AboutSection';
import HomeSection from './components/sections/HomeSection';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';

const AppContainer = styled.div<{ $darkMode: boolean }>`
  min-height: 100vh;
  background-color: ${props => props.$darkMode ? 'rgb(30, 31, 31)' : '#f0f0f0'};
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
`;

// Fixed Header container that stays at the top
const FixedHeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: 54px; /* Match header height */
`;

// Content container
const MainContentContainer = styled.div`
  position: relative; 
  width: 100%;
  margin: 0;
  padding: 0;
`;

// Adding a smooth scroll behavior to the entire app
const SmoothScrollContainer = styled.div`
  scroll-behavior: smooth;
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  
  & > section {
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
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
  
  // Handle animation completion
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
      // Get the scroll container element
      const scrollContainer = document.getElementById('smooth-scroll-container');
      if (!scrollContainer) return;
      
      const scrollPosition = scrollContainer.scrollTop;
      const sections = document.querySelectorAll('section[id]');
      
      // Find which section is currently in view
      const viewportHeight = window.innerHeight;
      let currentSectionId = null;
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + scrollContainer.scrollTop;
        const sectionBottom = sectionTop + section.getBoundingClientRect().height;
        
        // If scroll position is within section boundaries, this is the active section
        if (scrollPosition >= sectionTop - viewportHeight/2 && 
            scrollPosition < sectionBottom - viewportHeight/2) {
          currentSectionId = section.id;
        }
      });
      
      // Set active section based on the current section in view
      if (currentSectionId) {
        setActiveSection(currentSectionId);
        console.log("Scroll detected, active section set to:", currentSectionId);
      }
    };

    // Get scroll container
    const scrollContainer = document.getElementById('smooth-scroll-container');
    if (scrollContainer) {
      // Call once on mount to set initial active section
      handleScroll();
      
      // Add scroll event listener
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [mainContentVisible]);

  // When main content becomes visible, update body class to show scrollbar
  useEffect(() => {
    if (mainContentVisible) {
      document.body.classList.remove('intro-active');
      document.body.classList.add('intro-complete');
      
      // Reset scroll position and set active section
      const scrollContainer = document.getElementById('smooth-scroll-container');
      if (scrollContainer) {
        scrollContainer.scrollTop = 0;
      }
      setActiveSection('home'); // Set home as active section
    }
  }, [mainContentVisible]);

  // Direct toggle implementation for theme
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
          }}
        />
        
        {/* Show header and content after animation completes */}
        {mainContentVisible && (
          <>
            {/* Fixed header at the top */}
            <FixedHeaderContainer>
              <ContentRevealer visible={mainContentVisible} delay={0.1}>
                <Header 
                  darkMode={darkMode} 
                  onToggleTheme={toggleTheme} 
                  visible={true}
                  activeSection={activeSection || undefined}
                />
              </ContentRevealer>
            </FixedHeaderContainer>
            
            {/* Main content with smooth scrolling - rearranged sections */}
            <MainContentContainer>
              <ContentRevealer visible={mainContentVisible} delay={0.2}>
                <SmoothScrollContainer id="smooth-scroll-container">
                  <HomeSection id="home" darkMode={darkMode} hideHeader={true} />
                  <ServicesSection id="services" darkMode={darkMode} hideHeader={true} />
                  <PortfolioSection id="portfolio" darkMode={darkMode} hideHeader={true} />
                  <ContactSection id="contact" darkMode={darkMode} hideHeader={true} />
                  <AboutSection id="about" darkMode={darkMode} hideHeader={true} />
                </SmoothScrollContainer>
              </ContentRevealer>
            </MainContentContainer>
          </>
        )}
      </AppContainer>
    </>
  );
};

export default App;