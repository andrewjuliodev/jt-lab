// App.tsx - Modified to include legal pages
import React, { useState, useEffect, useRef } from 'react';
import IntroAnimation from './components/animations/IntroAnimation';
import FadeTransition, { ContentRevealer } from './components/animations/FadeTransition';
import Header from './components/Header';
import ServicesSection from './components/sections/ServicesSection';
import PortfolioSection from './components/sections/PortfolioSection';
import ContactSection from './components/sections/ContactSection';
import AboutSection from './components/sections/AboutSection';
import HomeSection from './components/sections/HomeSection';
import ImpressumPage from './components/pages/ImpressumPage';
import DatenschutzPage from './components/pages/DatenschutzPage';
import DisclaimerPage from './components/pages/DisclaimerPage';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';

interface AppContainerProps {
  $darkMode: boolean;
}

const AppContainer = styled.div<AppContainerProps>`
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

// Content container modified for vertical layout
const MainContentContainer = styled.div`
  position: relative; 
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden; /* Hide overflow */
`;

interface VerticalScrollContainerProps {
  $noTransition?: boolean;
}

// Vertical scroll container - modified for true infinite loop
const VerticalScrollContainer = styled.div<VerticalScrollContainerProps>`
  display: flex;
  flex-direction: column;
  height: 700%; /* Increased from 500% for loop buffer */
  width: 100vw;
  transition: ${props => props.$noTransition 
    ? 'none' 
    : 'transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1.000)'};
  will-change: transform; /* Performance optimization */
  touch-action: pan-x; /* Allow horizontal scrolling on touch devices */
`;

interface SectionWrapperProps {
  $isClone?: boolean;
}

// Section wrapper for vertical layout
const SectionWrapper = styled.div<SectionWrapperProps>`
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  overflow: hidden;
  opacity: ${props => props.$isClone ? 0.99 : 1}; /* Almost imperceptible difference for clones */
`;

// Navigation dots - moved to the left side
const NavDots = styled.div`
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 900;
`;

interface NavDotProps {
  $active: boolean;
  $darkMode: boolean;
}

const NavDot = styled.div<NavDotProps>`
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

// Directional arrows - moved to right side (where dots were previously)
const NavigationArrows = styled.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 900;
`;

interface ArrowProps {
  $darkMode: boolean;
  $direction: 'up' | 'down';
}

const Arrow = styled.button<ArrowProps>`
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
    transform: translateX(-3px);
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
    transform: ${props => props.$direction === 'up' ? 'rotate(270deg)' : 'rotate(90deg)'};
  }
`;

interface LegalPageContainerProps {
  $darkMode: boolean;
}

// Page container for legal pages
const LegalPageContainer = styled.div<LegalPageContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  overflow-y: auto;
  background-color: ${props => props.$darkMode ? 'rgb(30, 31, 31)' : '#f0f0f0'};
`;

const App: React.FC = () => {
  // Animation sequence state
  const [introComplete, setIntroComplete] = useState(false);
  const [fadeTransitionActive, setFadeTransitionActive] = useState(false);
  const [mainContentVisible, setMainContentVisible] = useState(false);
  
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Carousel state
  const [currentSectionIndex, setCurrentSectionIndex] = useState(1); // Start at index 1 (real first section)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [noTransition, setNoTransition] = useState(false);
  const scrollCooldown = 1000;
  
  // Legal pages state
  const [showImpressum, setShowImpressum] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  
  // Define sections
  const realSections = [
    { id: 'home', component: HomeSection },
    { id: 'services', component: ServicesSection },
    { id: 'portfolio', component: PortfolioSection },
    { id: 'contact', component: ContactSection },
    { id: 'about', component: AboutSection }
  ];
  
  // Create extended sections array for infinite loop
  // Format: [lastSection(clone), realSections, firstSection(clone)]
  const sections = [
    { ...realSections[realSections.length - 1], id: 'about-clone-before' },
    ...realSections,
    { ...realSections[0], id: 'home-clone-after' }
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
    // Skip if a legal page is showing
    if (showImpressum || showDatenschutz || showDisclaimer) return;
    
    // Convert current index to real section index (account for clones)
    let realIndex = currentSectionIndex - 1; // Adjust for the first clone
    
    // Handle special cases for clones
    if (realIndex < 0) {
      realIndex = realSections.length - 1; // Last real section
    } else if (realIndex >= realSections.length) {
      realIndex = 0; // First real section
    }
    
    if (realSections[realIndex]) {
      setActiveSection(realSections[realIndex].id);
    }
    
    // Reset transitioning state after animation completes
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        
        // Check if we need to perform a loop reset (we're on a clone section)
        if (currentSectionIndex === 0 || currentSectionIndex === sections.length - 1) {
          // When on a clone section, wait until transition completes, 
          // then disable transitions, instantly jump to the real section, 
          // and re-enable transitions
          setNoTransition(true);
          
          // Get the real index to jump to
          const jumpToIndex = currentSectionIndex === 0 
            ? sections.length - 2 // Jump to the last real section
            : 1; // Jump to the first real section
          
          // Set the real index without animation
          setCurrentSectionIndex(jumpToIndex);
          
          // Re-enable transitions on next frame
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setNoTransition(false);
            });
          });
        }
      }, scrollCooldown);
      
      return () => clearTimeout(timer);
    }
  }, [currentSectionIndex, isTransitioning, realSections, sections.length, showImpressum, showDatenschutz]);

  // When main content becomes visible, update body class
  useEffect(() => {
    if (mainContentVisible) {
      document.body.classList.remove('intro-active');
      document.body.classList.add('intro-complete');
      setCurrentSectionIndex(1); // Start with home section (index 1 in the extended array)
      setActiveSection('home');
    }
  }, [mainContentVisible]);

  // Navigation handler
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

  // Convert from real section index to extended array index
  const getRealToExtendedIndex = (realIndex: number) => {
    return realIndex + 1; // Add 1 to account for the leading clone
  };

  // Smooth scrolling wheel event handler function
  const handleWheel = (e: WheelEvent) => {
    // Skip if a legal page is showing
    if (showImpressum || showDatenschutz || showDisclaimer) return;
    
    e.preventDefault();
    
    if (isTransitioning || Math.abs(e.deltaY) < 10) return;
    
    if (e.deltaY > 30) {
      // Scrolling down - go to next section
      handleNavigation(currentSectionIndex + 1);
    } else if (e.deltaY < -30) {
      // Scrolling up - go to previous section
      handleNavigation(currentSectionIndex - 1);
    }
  };

  // Set up wheel event listener
  useEffect(() => {
    if (!mainContentVisible) return;
    
    // Skip if a legal page is showing
    if (showImpressum || showDatenschutz || showDisclaimer) return;
    
    // Use passive: false to be able to prevent default
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [mainContentVisible, currentSectionIndex, isTransitioning, showImpressum, showDatenschutz]);
  
  // Handle touch events for mobile swipe
  useEffect(() => {
    if (!mainContentVisible) return;
    
    // Skip if a legal page is showing
    if (showImpressum || showDatenschutz || showDisclaimer) return;
    
    const container = document.getElementById('vertical-scroll-container');
    if (!container) return;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY; // Changed from clientX to clientY for vertical
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      touchMoveRef.current = e.touches[0].clientY; // Changed from clientX to clientY for vertical
    };
    
    const handleTouchEnd = () => {
      const touchStart = touchStartRef.current;
      const touchMove = touchMoveRef.current;
      const diff = touchStart - touchMove;
      
      // Minimum swipe distance
      if (Math.abs(diff) < 60 || isTransitioning) return;
      
      if (diff > 0) {
        // Swipe up - go to next section
        handleNavigation(currentSectionIndex + 1);
      } else if (diff < 0) {
        // Swipe down - go to previous section
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
  }, [mainContentVisible, currentSectionIndex, isTransitioning, showImpressum, showDatenschutz]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!mainContentVisible) return;
    
    // Skip if a legal page is showing
    if (showImpressum || showDatenschutz || showDisclaimer) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      
      switch (e.key) {
        case 'ArrowDown':
          handleNavigation(currentSectionIndex + 1);
          break;
        case 'ArrowUp':
          handleNavigation(currentSectionIndex - 1);
          break;
        case 'Home':
          // Go to first real section (index 1)
          handleNavigation(1);
          break;
        case 'End':
          // Go to last real section (index sections.length - 2)
          handleNavigation(sections.length - 2);
          break;
        case 'Escape':
          // Close legal pages if open
          if (showImpressum) setShowImpressum(false);
          if (showDatenschutz) setShowDatenschutz(false);
          if (showDisclaimer) setShowDisclaimer(false);
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mainContentVisible, currentSectionIndex, isTransitioning, sections.length, showImpressum, showDatenschutz, showDisclaimer]);

  // Navigate to specific section in the real sections array
  const navigateToRealSection = (realIndex: number) => {
    // Close legal pages if open
    setShowImpressum(false);
    setShowDatenschutz(false);
    setShowDisclaimer(false);
    setShowDisclaimer(false);
    
    // Convert to extended array index
    const extendedIndex = getRealToExtendedIndex(realIndex);
    handleNavigation(extendedIndex);
  };
  
  // Navigate to specific section by ID
  const navigateToSectionById = (sectionId: string) => {
    // Handle legal pages navigation
    if (sectionId === 'impressum') {
      setShowImpressum(true);
      return;
    }
    
    if (sectionId === 'datenschutz') {
      setShowDatenschutz(true);
      return;
    }
    
    if (sectionId === 'disclaimer') {
      setShowDisclaimer(true);
      return;
    }
    
    // Close legal pages if open
    setShowImpressum(false);
    setShowDatenschutz(false);
    
    const realIndex = realSections.findIndex(section => section.id === sectionId);
    if (realIndex !== -1) {
      navigateToRealSection(realIndex);
    }
  };

  // Navigate to home section for logo click
  const navigateToHome = () => {
    // Close legal pages if open
    setShowImpressum(false);
    setShowDatenschutz(false);
    setShowDisclaimer(false);
    
    navigateToRealSection(0); // Home is the first real section (index 0)
  };

  // Navigate to next section
  const navigateNext = () => {
    handleNavigation(currentSectionIndex + 1);
  };

  // Navigate to previous section
  const navigatePrev = () => {
    handleNavigation(currentSectionIndex - 1);
  };

  // Handle navbar section change
  const handleSectionChange = (sectionId: string) => {
    navigateToSectionById(sectionId);
  };

  // Handle click on legal notice button
  const handleLegalNoticeClick = () => {
    setShowImpressum(true);
  };

  // Handle click on data protection button
  const handleDataProtectionClick = () => {
    setShowDatenschutz(true);
  };

  // Handle click on disclaimer button
  const handleDisclaimerClick = () => {
    setShowDisclaimer(true);
  };

  // Handle back button from legal pages
  const handleBackFromLegalPage = () => {
    setShowImpressum(false);
    setShowDatenschutz(false);
    setShowDisclaimer(false);
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
                  onSectionChange={handleSectionChange}
                />
              </ContentRevealer>
            </FixedHeaderContainer>
            
            {/* Main content with vertical scrolling */}
            <MainContentContainer>
              <ContentRevealer visible={mainContentVisible} delay={0.2}>
                <VerticalScrollContainer 
                  id="vertical-scroll-container"
                  style={{ transform: `translateY(-${currentSectionIndex * (100/7)}%)` }}
                  $noTransition={noTransition}
                >
                  {sections.map((section, index) => (
                    <SectionWrapper 
                      key={section.id}
                      $isClone={index === 0 || index === sections.length - 1}
                    >
                      <section.component 
                        id={section.id} 
                        darkMode={darkMode} 
                        hideHeader={true}
                        onLegalNoticeClick={handleLegalNoticeClick}
                        onDataProtectionClick={handleDataProtectionClick}
                        onDisclaimerClick={handleDisclaimerClick}
                      />
                    </SectionWrapper>
                  ))}
                </VerticalScrollContainer>
                
                {/* Navigation dots - moved to left side */}
                {!showImpressum && !showDatenschutz && !showDisclaimer && (
                  <NavDots>
                    {realSections.map((section, index) => {
                      // Calculate if this dot should be active based on the current extended index
                      const isActive = index + 1 === currentSectionIndex || 
                        (index === 0 && currentSectionIndex === sections.length - 1) ||
                        (index === realSections.length - 1 && currentSectionIndex === 0);
                        
                      return (
                        <NavDot 
                          key={section.id}
                          $active={isActive}
                          $darkMode={darkMode}
                          onClick={() => navigateToRealSection(index)}
                          title={section.id.charAt(0).toUpperCase() + section.id.slice(1)}
                        />
                      );
                    })}
                  </NavDots>
                )}
                
                {/* Navigation arrows - now for up/down navigation */}
                {!showImpressum && !showDatenschutz && !showDisclaimer && (
                  <NavigationArrows>
                    <Arrow 
                      $darkMode={darkMode} 
                      $direction="up"
                      onClick={navigatePrev}
                      aria-label="Previous section"
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </Arrow>
                    <Arrow 
                      $darkMode={darkMode} 
                      $direction="down"
                      onClick={navigateNext}
                      aria-label="Next section"
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </Arrow>
                  </NavigationArrows>
                )}
              </ContentRevealer>
            </MainContentContainer>
            
            {/* Legal Pages */}
            {showImpressum && (
              <LegalPageContainer $darkMode={darkMode}>
                <ImpressumPage darkMode={darkMode} onBack={handleBackFromLegalPage} />
              </LegalPageContainer>
            )}
            
            {showDatenschutz && (
              <LegalPageContainer $darkMode={darkMode}>
                <DatenschutzPage darkMode={darkMode} onBack={handleBackFromLegalPage} />
              </LegalPageContainer>
            )}
            
            {showDisclaimer && (
              <LegalPageContainer $darkMode={darkMode}>
                <DisclaimerPage darkMode={darkMode} onBack={handleBackFromLegalPage} />
              </LegalPageContainer>
            )}
          </>
        )}
      </AppContainer>
    </>
  );
};

export default App;