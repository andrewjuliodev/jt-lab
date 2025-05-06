// App.tsx - Fixed navigation issues
import React, { useState, useEffect, useRef } from 'react';
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
  overflow: hidden; /* Prevent scrollbars on the body */
`;

// Fixed Header container that stays at the top
const FixedHeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: 54px; /* Match header height */
  /* Add glassmorphic effect */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

// Content container modified for horizontal layout
const MainContentContainer = styled.div`
  position: relative; 
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden; /* Hide overflow */
`;

// Horizontal scroll container
const HorizontalScrollContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 500%; /* 100% per section, assuming 5 sections */
  height: 100vh;
  transition: transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1.000); /* Improved smoother easing */
  will-change: transform; /* Performance optimization */
  touch-action: pan-y; /* Allow vertical scrolling on touch devices */
`;

// Section wrapper for horizontal layout
const SectionWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  overflow: hidden;
`;

// Navigation dots
const NavDots = styled.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 900;
`;

const NavDot = styled.div<{ $active: boolean; $darkMode: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.$active 
    ? 'rgba(132,227,215, 1.0)' 
    : props.$darkMode 
      ? 'rgba(255, 255, 255, 0.5)' 
      : 'rgba(0, 0, 0, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$active 
    ? '0 0 10px rgba(132,227,215, 0.5)' 
    : 'none'};
  
  &:hover {
    transform: scale(1.2);
    background-color: rgba(132,227,215, 0.8);
  }
`;

// Directional arrows
const NavigationArrows = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 30px;
  z-index: 900;
`;

const Arrow = styled.button<{ $darkMode: boolean; $direction: 'left' | 'right' }>`
  width: 50px;
  height: 50px;
  background-color: ${props => props.$darkMode 
    ? 'rgba(30, 31, 31, 0.7)' 
    : 'rgba(255, 255, 255, 0.7)'};
  border: 1px solid rgba(132,227,215, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: rgba(132,227,215, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  svg {
    width: 24px;
    height: 24px;
    fill: none;
    stroke: ${props => props.$darkMode ? '#fff' : '#333'};
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    transform: ${props => props.$direction === 'left' ? 'rotate(180deg)' : 'none'};
  }
`;

const App: React.FC = () => {
  // Animation sequence state
  const [introComplete, setIntroComplete] = useState(false);
  const [fadeTransitionActive, setFadeTransitionActive] = useState(false);
  const [mainContentVisible, setMainContentVisible] = useState(false);
  
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Current section index for horizontal scrolling
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  
  // Transition state - moved to a React state for better reliability
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollCooldown = 1000; // Slightly reduced for better responsiveness
  
  // Define sections
  const sections = [
    { id: 'home', component: HomeSection },
    { id: 'services', component: ServicesSection },
    { id: 'portfolio', component: PortfolioSection },
    { id: 'contact', component: ContactSection },
    { id: 'about', component: AboutSection }
  ];
  
  // Touch event handling
  const touchStartRef = useRef(0);
  const touchMoveRef = useRef(0);
  
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

  // Update active section based on currentSectionIndex
  useEffect(() => {
    if (sections[currentSectionIndex]) {
      setActiveSection(sections[currentSectionIndex].id);
    }
    
    // Set transitioning state
    if (isTransitioning) {
      // Reset the transitioning state after animation completes
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, scrollCooldown);
      
      return () => clearTimeout(timer);
    }
  }, [currentSectionIndex, isTransitioning, sections]);

  // When main content becomes visible, update body class
  useEffect(() => {
    if (mainContentVisible) {
      document.body.classList.remove('intro-active');
      document.body.classList.add('intro-complete');
      setCurrentSectionIndex(0); // Start with home section
      setActiveSection('home');
    }
  }, [mainContentVisible]);

  // Changed to use React state instead of ref for transitioning state
  const handleNavigation = (newIndex: number) => {
    // If we're already at the target index or currently transitioning, do nothing
    if (newIndex === currentSectionIndex || isTransitioning) {
      return;
    }
    
    // Set transitioning state
    setIsTransitioning(true);
    
    // Update the section index
    setCurrentSectionIndex(newIndex);
  };

  // Smooth scrolling wheel event handler function - simplified
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    
    if (isTransitioning || Math.abs(e.deltaY) < 10) return;
    
    if (e.deltaY > 30 && currentSectionIndex < sections.length - 1) {
      // Scroll right/down - go to next section
      handleNavigation(currentSectionIndex + 1);
    } else if (e.deltaY < -30 && currentSectionIndex > 0) {
      // Scroll left/up - go to previous section
      handleNavigation(currentSectionIndex - 1);
    }
  };

  // Set up wheel event listener
  useEffect(() => {
    if (!mainContentVisible) return;
    
    // Use passive: false to be able to prevent default
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [mainContentVisible, currentSectionIndex, isTransitioning]);
  
  // Handle touch events for mobile swipe with improved reliability
  useEffect(() => {
    if (!mainContentVisible) return;
    
    const container = document.getElementById('horizontal-scroll-container');
    if (!container) return;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientX;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      touchMoveRef.current = e.touches[0].clientX;
    };
    
    const handleTouchEnd = () => {
      const touchStart = touchStartRef.current;
      const touchMove = touchMoveRef.current;
      const diff = touchStart - touchMove;
      
      // Minimum swipe distance
      if (Math.abs(diff) < 60 || isTransitioning) return;
      
      if (diff > 0 && currentSectionIndex < sections.length - 1) {
        // Swipe left - go to next section
        handleNavigation(currentSectionIndex + 1);
      } else if (diff < 0 && currentSectionIndex > 0) {
        // Swipe right - go to previous section
        handleNavigation(currentSectionIndex - 1);
      }
    };
    
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [mainContentVisible, currentSectionIndex, isTransitioning, sections.length]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!mainContentVisible) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      
      switch (e.key) {
        case 'ArrowRight':
          if (currentSectionIndex < sections.length - 1) {
            handleNavigation(currentSectionIndex + 1);
          }
          break;
        case 'ArrowLeft':
          if (currentSectionIndex > 0) {
            handleNavigation(currentSectionIndex - 1);
          }
          break;
        case 'Home':
          handleNavigation(0);
          break;
        case 'End':
          handleNavigation(sections.length - 1);
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mainContentVisible, currentSectionIndex, isTransitioning, sections.length]);

  // Navigate to specific section
  const navigateToSection = (index: number) => {
    handleNavigation(index);
  };
  
  // Navigate to specific section by ID
  const navigateToSectionById = (sectionId: string) => {
    const index = sections.findIndex(section => section.id === sectionId);
    if (index !== -1) {
      handleNavigation(index);
    }
  };

  // Navigate to home section for logo click
  const navigateToHome = () => {
    handleNavigation(0); // Home is the first section (index 0)
  };

  // Navigate to next section
  const navigateNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      handleNavigation(currentSectionIndex + 1);
    }
  };

  // Navigate to previous section
  const navigatePrev = () => {
    if (currentSectionIndex > 0) {
      handleNavigation(currentSectionIndex - 1);
    }
  };

  // Handle navbar section change
  const handleSectionChange = (sectionId: string) => {
    navigateToSectionById(sectionId);
  };

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
        
        {/* Fade transition overlay */}
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
            {/* Fixed header at the top with Navbar */}
            <FixedHeaderContainer>
              <ContentRevealer visible={mainContentVisible} delay={0.1}>
                <Header 
                  darkMode={darkMode} 
                  onToggleTheme={toggleTheme} 
                  visible={true}
                  activeSection={activeSection || undefined}
                  onLogoClick={navigateToHome}
                  onSectionChange={handleSectionChange} // Added section change handler
                />
              </ContentRevealer>
            </FixedHeaderContainer>
            
            {/* Main content with horizontal scrolling */}
            <MainContentContainer>
              <ContentRevealer visible={mainContentVisible} delay={0.2}>
                <HorizontalScrollContainer 
                  id="horizontal-scroll-container"
                  style={{ transform: `translateX(-${currentSectionIndex * 20}%)` }}
                >
                  {sections.map((section, index) => (
                    <SectionWrapper key={section.id}>
                      <section.component 
                        id={section.id} 
                        darkMode={darkMode} 
                        hideHeader={true} 
                      />
                    </SectionWrapper>
                  ))}
                </HorizontalScrollContainer>
                
                {/* Navigation dots */}
                <NavDots>
                  {sections.map((section, index) => (
                    <NavDot 
                      key={section.id}
                      $active={currentSectionIndex === index}
                      $darkMode={darkMode}
                      onClick={() => navigateToSection(index)}
                      title={section.id.charAt(0).toUpperCase() + section.id.slice(1)}
                    />
                  ))}
                </NavDots>
                
                {/* Navigation arrows */}
                <NavigationArrows>
                  <Arrow 
                    $darkMode={darkMode} 
                    $direction="left"
                    onClick={navigatePrev}
                    style={{ opacity: currentSectionIndex === 0 ? 0.5 : 1 }}
                    disabled={currentSectionIndex === 0}
                    aria-label="Previous section"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Arrow>
                  <Arrow 
                    $darkMode={darkMode} 
                    $direction="right"
                    onClick={navigateNext}
                    style={{ opacity: currentSectionIndex === sections.length - 1 ? 0.5 : 1 }}
                    disabled={currentSectionIndex === sections.length - 1}
                    aria-label="Next section"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Arrow>
                </NavigationArrows>
              </ContentRevealer>
            </MainContentContainer>
          </>
        )}
      </AppContainer>
    </>
  );
};

export default App;