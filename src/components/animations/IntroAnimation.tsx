// src/components/animations/IntroAnimation.tsx - Fixed with proper text centering
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styled, { keyframes, css } from 'styled-components';
import ScrambleText from './ScrambleText';

interface IntroAnimationProps {
  onComplete: () => void;
  onThemeToggle: (isDarkMode: boolean) => void;
  darkMode: boolean;
}

// Constants
const POSITION = {
  VERTICAL_ADJUSTMENT_TITLE: "-20vh", // Adjusted for better centering
  VERTICAL_ADJUSTMENT_SUBTITLE: "-25vh",
  HORIZONTAL_ADJUSTMENT: "12.5%"
};

const COLORS = {
  GLOW: 'rgba(132,227,215, 1.0)',
  GLOW_MEDIUM: 'rgba(132,227,215, 0.8)',
  GLOW_LIGHT: 'rgba(132,227,215, 0.6)',
  GLOW_LIGHTER: 'rgba(132,227,215, 0.4)',
  GLOW_LIGHTEST: 'rgba(132,227,215, 0.3)',
  GLOW_FAINT: 'rgba(132,227,215, 0.2)',
  TEXT_DARK: 'rgba(0, 0, 0, 0.7)',
  TEXT_LIGHT: 'rgba(255, 255, 255, 0.7)'
};

// Export the animation so it's not unused - can be imported by other components
export const continuousGlowBurst = keyframes`
  0% {
    text-shadow:
      0 0 4px ${COLORS.GLOW_LIGHTEST}, /* Increased from 3px */
      0 0 7px ${COLORS.GLOW_FAINT};    /* Increased from 5px */
  }
  50% {
    text-shadow:
      0 0 8px ${COLORS.GLOW_MEDIUM},
      0 0 12px ${COLORS.GLOW_LIGHTER},
      0 0 16px ${COLORS.GLOW_LIGHTEST};
  }
  100% {
    text-shadow:
      0 0 4px ${COLORS.GLOW_LIGHTEST}, /* Increased from 3px */
      0 0 7px ${COLORS.GLOW_FAINT};    /* Increased from 5px */
  }
`;

// New pulsating glow animation for JT Lab text
const powerGlowPulsate = keyframes`
  0% {
    text-shadow:
      0 0 20px ${COLORS.GLOW},
      0 0 40px ${COLORS.GLOW},
      0 0 60px ${COLORS.GLOW_MEDIUM},
      0 0 80px ${COLORS.GLOW_MEDIUM};
  }
  50% {
    text-shadow:
      0 0 40px ${COLORS.GLOW},
      0 0 70px ${COLORS.GLOW},
      0 0 100px ${COLORS.GLOW_MEDIUM},
      0 0 130px ${COLORS.GLOW_MEDIUM};
  }
  100% {
    text-shadow:
      0 0 20px ${COLORS.GLOW},
      0 0 40px ${COLORS.GLOW},
      0 0 60px ${COLORS.GLOW_MEDIUM},
      0 0 80px ${COLORS.GLOW_MEDIUM};
  }
`;

// New subtle pulsating glow animation for subtitle text
const subtleGlowPulsate = keyframes`
  0% {
    text-shadow:
      0 0 2px ${COLORS.GLOW_LIGHTER},
      0 0 4px ${COLORS.GLOW_LIGHTEST};
  }
  50% {
    text-shadow:
      0 0 4px ${COLORS.GLOW_LIGHTER},
      0 0 8px ${COLORS.GLOW_LIGHTEST},
      0 0 12px ${COLORS.GLOW_FAINT};
  }
  100% {
    text-shadow:
      0 0 2px ${COLORS.GLOW_LIGHTER},
      0 0 4px ${COLORS.GLOW_LIGHTEST};
  }
`;

// Styled components with fixed props (using $ prefix)
const Container = styled.div<{ $darkMode?: boolean; $lightTheme?: boolean }>`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: ${props => {
    if (props.$darkMode) return 'rgb(30, 31, 31)';
    if (props.$lightTheme) return '#fff';
    return '#fff';
  }};
  color: ${props => props.$darkMode ? '#fff' : '#000'};
  overflow: hidden;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  display: flex; /* Add flexbox to help with centering */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
`;

const ProfileImage = styled(motion.img)`
  position: absolute;
  bottom: 0;
  left: calc(50% + 12vw);
  transform: translateX(-50%);
  width: auto;
  height: 90vh;
  z-index: 1;
  
  @media (max-width: 768px) {
    height: 70vh;
  }
  
  @media (max-width: 480px) {
    height: 50vh;
  }
`;

const LogoWrapper = styled(motion.div)<{
  $blur?: string;
  $fontSize?: string;
}>`
  position: absolute;
  display: inline-flex;
  font-family: "Cal Sans", sans-serif;
  font-size: ${props => props.$fontSize || "4.5rem"};
  font-weight: bold;
  color: #000;
  filter: ${({ $blur }) => $blur || "none"};
  z-index: 3;
  white-space: nowrap;
  transition: font-size 0.8s ease-in-out, color 0.5s ease-in-out;
  
  @media (max-width: 768px) {
    font-size: ${props => props.$fontSize === "2.2rem" ? "1.8rem" : "3.5rem"};
  }
  
  @media (max-width: 480px) {
    font-size: ${props => props.$fontSize === "2.2rem" ? "1.5rem" : "2.5rem"};
  }
`;

// Updated for better vertical centering
const CenteredTextContainer = styled.div`
  position: fixed;
  top: 45%; /* Adjusted from 40% to 45% for better centering */
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  text-align: center;
  z-index: 20;
  
  @media (max-width: 768px) {
    top: 40%;
  }
`;

// Updated subtitle container with consistent gap from main title
const SubtitleTextContainer = styled.div`
  position: fixed;
  top: calc(45% + 9.5vh); /* Adjusted to maintain consistent gap from main title */
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  max-width: 90%;
  text-align: center;
  z-index: 25;
  font-family: "Montserrat", sans-serif;
  font-size: 1.3rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.7);
  transition: color 0.4s ease-in-out;
  
  @media (max-width: 768px) {
    top: calc(40% + 9vh);
    font-size: 1.1rem;
    max-width: 95%;
  }
`;

// Animated text components to replace the animation in inline styles
const MainJTLabText = styled(motion.div)<{ $powerGlow: boolean; $darkMode: boolean }>`
  font-family: "Cal Sans", sans-serif;
  font-weight: bold;
  animation: ${props => props.$powerGlow ? css`${powerGlowPulsate} 3s ease-in-out infinite` : 'none'};
  color: ${props => props.$darkMode ? '#fff' : '#000'};
  -webkit-text-fill-color: ${props => props.$darkMode ? 'white' : 'black'};
  -webkit-text-stroke: 0.5px ${props => props.$darkMode ? 'white' : 'black'};
  transition: color 0.3s ease-in-out, text-shadow 0.3s ease-in-out;
  transform: translateZ(0); /* Force GPU acceleration for smoother animation */
  
  /* This ensures a smooth fade-out when glow is removed, not an abrupt change */
  text-shadow: ${props => !props.$powerGlow ? 'none' : 'inherit'};
`;

// Updated subtitle text with simpler styling - slightly blurred background
const SubtitleText = styled(motion.div)<{ $powerGlow: boolean; $darkMode: boolean }>`
  font-weight: 400;
  animation: ${props => props.$powerGlow ? css`${subtleGlowPulsate} 3s ease-in-out infinite` : 'none'};
  color: ${props => props.$darkMode ? COLORS.TEXT_LIGHT : COLORS.TEXT_DARK};
  transition: text-shadow 0.3s ease-in-out;
  transform: translateZ(0); /* Force GPU acceleration */
  text-shadow: ${props => !props.$powerGlow ? 'none' : 'inherit'};
  
  /* Simpler styling with just a slightly blurred background */
  background-color: ${props => props.$darkMode ? 'rgba(30, 31, 31, 0.4)' : 'rgba(255, 255, 255, 0.4)'};
  padding: 8px 16px;
  border-radius: 8px;
  /* Simple blur effect without neumorphic or glassmorphic styling */
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
`;

const NameWrapper = styled(motion.div)`
  display: flex;
`;

const Letter = styled(motion.span)`
  display: inline-block;
`;

// Main component
const IntroAnimation: React.FC<IntroAnimationProps> = ({ 
  onComplete, 
  onThemeToggle, 
  darkMode 
}) => {
  // Constants
  const name = "JulioTompsett's";
  // Updated animation timings:
  // Added 500ms delay to retraction and scrambling
  // Reduced JT Lab glow duration to 1800ms
  const ANIMATION_TIMINGS = {
    INITIAL_ELEMENTS: 1000,   // Elements appear at 1000ms (1.0s)
    SUBTITLE_TEXT: 1100,      // Subtitle text appears at 1100ms (1.1s)
    START_RETRACTION: 3250,   // Letters start retracting at 3250ms (added 500ms)
    START_SCRAMBLING: 3750,   // Text scrambling starts at 3750ms (added 500ms)
    HIDE_RETRACTED_JT: 4400,  // Retracted text disappears at 4400ms (adjusted for new timing)
    POWER_GLOW_BURST: 4250,   // Power glow burst timing unchanged
    FINAL_GLOW: 4500,         // Final glow transition timing unchanged
    ANIMATION_COMPLETE: 2800  // Animation completes sooner (reduced from 4000ms to 2800ms)
  };

  // State management - organized by functionality
  // Animation sequence states
  const [retract, setRetract] = useState(false);
  const [showJT] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [fadeOutSubtitle] = useState(false);
  const [retreatImage] = useState(false);
  const [showJulioTompsett, setShowJulioTompsett] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [startScramble, setStartScramble] = useState(false);
  const [scrambleComplete, setScrambleComplete] = useState(false);
  const [hideRetractedJT, setHideRetractedJT] = useState(false);
  const [mainJTLabText, setMainJTLabText] = useState(false);
  const [showSubtitleText, setShowSubtitleText] = useState(false);
  const [swishExit, setSwishExit] = useState(false);
  const [imageExit, setImageExit] = useState(false);
  
  // Theme and appearance states
  const [lightTheme] = useState(false);
  const [blur, setBlur] = useState<"none"|"blur(5px)">("none");
  const [textPos, setTextPos] = useState<{ top: string; left: string }>({
    top: `calc(50% + ${POSITION.VERTICAL_ADJUSTMENT_TITLE})`,
    left: POSITION.HORIZONTAL_ADJUSTMENT,
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentGlowLevel, setCurrentGlowLevel] = useState<'full' | 'continuous' | 'transitioning' | 'power' | undefined>(undefined);

  // Refs
  const jRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  // Helper functions
  const leftOffset = POSITION.HORIZONTAL_ADJUSTMENT;

  const handleScrambleComplete = () => {
    console.log("[Animation] Scramble complete at:", Date.now());
    setScrambleComplete(true);
    setShowSubtitle(false);
    setMainJTLabText(true);
    setBlur("none");
    
    // Set power glow immediately and keep it active until exit
    setTimeout(() => {
      console.log("[Animation] Applying power glow after delay at:", Date.now());
      setCurrentGlowLevel('power');
      
      // Stop the glow effect 300ms before the exit transition
      setTimeout(() => {
        console.log("[Animation] Stopping glow effect before exit:", Date.now());
        setCurrentGlowLevel(undefined); // Remove glow effect
        
        // Wait 300ms and then start the exit animation
        setTimeout(() => {
          // Start the exit animation for all elements simultaneously
          setSwishExit(true);
          setImageExit(true);
          
          // Delay the completion callback until after the exit animation
          setTimeout(onComplete, 900);
        }, 300); // 300ms pause with no glow before exit
        
      }, 1500); // Reduced from 1800ms to 1500ms to account for the 300ms no-glow period
    }, 200);
  };

  // Effect for screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setTextPos({
          top: `calc(35% + ${POSITION.VERTICAL_ADJUSTMENT_TITLE})`,
          left: POSITION.HORIZONTAL_ADJUSTMENT
        });
      } else {
        setTextPos({
          top: `calc(50% + ${POSITION.VERTICAL_ADJUSTMENT_TITLE})`,
          left: POSITION.HORIZONTAL_ADJUSTMENT
        });
      }
      
      setWindowWidth(window.innerWidth);
    };
    
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect for calculating text offsets during retraction
  useEffect(() => {
    if (retract) {
      setBlur("blur(5px)");
    }
  }, [retract]);

  // Main animation sequence effect
  useEffect(() => {
    // Load saved dark mode preference if available
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true' && !darkMode) {
      onThemeToggle(true);
    }

    const timers = [
      setTimeout(() => {
        console.log("[Animation] Starting initial elements appearance at:", Date.now());
        setShowSubtitle(true);
        setShowJulioTompsett(true);
        setImageVisible(true);
      }, ANIMATION_TIMINGS.INITIAL_ELEMENTS),
      
      setTimeout(() => {
        console.log("[Animation] Showing subtitle text at:", Date.now());
        setShowSubtitleText(true);
      }, ANIMATION_TIMINGS.SUBTITLE_TEXT),
      
      setTimeout(() => {
        console.log("[Animation] Starting retraction at:", Date.now());
        setRetract(true);
      }, ANIMATION_TIMINGS.START_RETRACTION),
      
      setTimeout(() => {
        console.log("[Animation] Starting scrambling at:", Date.now());
        setStartScramble(true);
      }, ANIMATION_TIMINGS.START_SCRAMBLING),
      
      setTimeout(() => {
        console.log("[Animation] Hiding retracted JT at:", Date.now());
        setHideRetractedJT(true);
      }, ANIMATION_TIMINGS.HIDE_RETRACTED_JT),
      
      setTimeout(() => {
        console.log("[Animation] Initiating power glow burst at:", Date.now());
        setCurrentGlowLevel('power');
      }, ANIMATION_TIMINGS.POWER_GLOW_BURST)
    ];
    
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onComplete, darkMode, onThemeToggle]);

  // Render functions
  const renderInitial = () => (
    <NameWrapper
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: showJulioTompsett ? 1 : 0,
        color: darkMode ? COLORS.TEXT_LIGHT : COLORS.TEXT_DARK
      }}
      transition={{ 
        opacity: { duration: 1.5, ease: "easeInOut" },
        color: { duration: 0.4 }
      }}
    >
      {name.split("").map((c, i) => (
        <Letter 
          key={i}
          ref={el => {
            if (el) {
              if (i===0) jRef.current = el;
              lettersRef.current[i] = el;
            }
          }}
        >{c}</Letter>
      ))}
    </NameWrapper>
  );

  const renderRetract = () => (
    <NameWrapper
      animate={{ opacity: hideRetractedJT ? 0 : 1 }}
      transition={{ opacity: { duration: 0.8, ease: "easeOut" } }}
    >
      {name.split("").map((c, i) => (
        <Letter 
          key={`letter-${i}`}
          initial={{ x: 0, opacity: 1 }}
          animate={{ 
            x: `-${i * 0.5}em`, 
            opacity: 0 
          }}
          transition={{
            x: { duration: 0.6, delay: i * 0.04 },
            opacity: { duration: 0.4, delay: i * 0.04 }
          }}
          ref={el => {
            if (el && i === 0) jRef.current = el;
            if (el) lettersRef.current[i] = el;
          }}
        >
          {c}
        </Letter>
      ))}
    </NameWrapper>
  );

  // Render component
  return (
    <Container $darkMode={darkMode} $lightTheme={lightTheme && !darkMode}>
      {/* Profile image - with faster slide-in animation */}
      <ProfileImage 
        src="/ja_left.png" 
        alt="Profile" 
        initial={{ 
          opacity: 0,
          y: "100vh"
        }}
        animate={{ 
          opacity: imageExit ? 0 : (retreatImage ? 0 : (imageVisible ? 1 : 0)),
          y: imageExit ? "-100vh" : (retreatImage ? "100vh" : (imageVisible ? 0 : "100vh")),
          x: imageExit ? "100vw" : 0
        }}
        transition={{ 
          opacity: { duration: 0.5, ease: "easeInOut" }, // Faster opacity transition
          y: { 
            duration: imageExit ? 0.8 : 0.8, // Faster slide-in (was 1.5s)
            ease: "easeOut"
          },
          x: {
            duration: imageExit ? 0.8 : 0,
            ease: "easeIn"
          }
        }}
      />
      
      {/* JulioTompsett or retract */}
      <LogoWrapper
        $blur={blur}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: hideRetractedJT ? 0 : 1,
          color: darkMode ? '#fff' : '#000'
        }}
        transition={{ 
          duration: 0.6, 
          color: { duration: 0.8 }
        }}
        style={{
          top: textPos.top,
          left: leftOffset,
          transform: "translateY(-50%)",
          transition: "color 0.8s ease-in-out"
        }}
      >
        {!retract && !showJT ? renderInitial() : renderRetract()}
      </LogoWrapper>

      {/* Web Development subtitle */}
      {showSubtitle && !startScramble && (
        <>
          <CenteredTextContainer>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: fadeOutSubtitle ? 0 : 1,
                color: darkMode ? COLORS.TEXT_LIGHT : COLORS.TEXT_DARK
              }}
              transition={{ 
                opacity: { duration: 1.5, ease: "easeInOut" },
                color: { duration: 0.4 }
              }}
              style={{
                fontFamily: "Cal Sans, sans-serif",
                fontSize: windowWidth <= 768 ? "8rem" : "12rem",
                fontWeight: "bold"
              }}
            >
              Web Dev.
            </motion.div>
          </CenteredTextContainer>
          
          {/* Subtitle text below Web Dev - Updated with simpler styling */}
          {showSubtitleText && (
            <SubtitleTextContainer>
              <motion.div
                initial={{ 
                  opacity: 0,
                  x: -100,
                  skewX: 10,
                  letterSpacing: "-5px"
                }}
                animate={{ 
                  opacity: fadeOutSubtitle ? 0 : 1,
                  x: 0,
                  skewX: 0,
                  letterSpacing: "0px",
                  color: darkMode ? COLORS.TEXT_LIGHT : COLORS.TEXT_DARK
                }}
                transition={{ 
                  opacity: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] },
                  x: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
                  skewX: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
                  letterSpacing: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
                  color: { duration: 0.4 }
                }}
                style={{
                  fontWeight: 400,
                  fontSize: windowWidth <= 768 ? "1.1rem" : "1.2rem",
                  display: "inline-block",
                  // Simplified styling with just light blur
                  backgroundColor: darkMode ? 'rgba(30, 31, 31, 0.4)' : 'rgba(255, 255, 255, 0.4)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  backdropFilter: 'blur(2px)',
                  WebkitBackdropFilter: 'blur(2px)',
                }}
              >
                Crafting Custom Websites: Business, E-commerce, Portfolios & More
              </motion.div>
            </SubtitleTextContainer>
          )}
        </>
      )}

      {/* Text scrambling animation */}
      {startScramble && !scrambleComplete && (
        <>
          <CenteredTextContainer>
            <ScrambleText 
              startText="Web Dev."
              endText="JT Lab"
              duration={1000}
              color={darkMode ? COLORS.TEXT_LIGHT : COLORS.TEXT_DARK}
              fontSize={windowWidth <= 768 ? "8rem" : "12rem"}
              onComplete={handleScrambleComplete}
            />
          </CenteredTextContainer>
          
          {/* Subtitle with scramble effect - simplified styling */}
          <SubtitleTextContainer>
            <ScrambleText 
              startText="Crafting Custom Websites: Business, E-commerce, Portfolios & More"
              endText="Landing Sites | SPA | PWA | Web | Mobile Optimized"
              duration={1000}
              color={darkMode ? COLORS.TEXT_LIGHT : COLORS.TEXT_DARK}
              fontSize={windowWidth <= 768 ? "1.1rem" : "1.2rem"}
              style={{ 
                fontWeight: 400,
                // Simplified styling with just light blur
                backgroundColor: darkMode ? 'rgba(30, 31, 31, 0.4)' : 'rgba(255, 255, 255, 0.4)',
                padding: '8px 16px',
                borderRadius: '8px',
                backdropFilter: 'blur(2px)', 
                WebkitBackdropFilter: 'blur(2px)',
              }}
            />
          </SubtitleTextContainer>
        </>
      )}

      {/* JT Lab in center position with swish exit animation */}
      {mainJTLabText && (
        <>
          <CenteredTextContainer>
            <MainJTLabText
              $powerGlow={currentGlowLevel === 'power'}
              $darkMode={darkMode}
              initial={{ opacity: 0, x: 0 }}
              animate={{ 
                opacity: swishExit ? 0 : 1,
                x: swishExit ? "100vw" : 0, // Animate to right side of screen
              }}
              transition={{ 
                opacity: { duration: 0.8 },
                x: { duration: 0.8, ease: "easeIn" } // Use easeIn for acceleration effect
              }}
              style={{
                fontSize: windowWidth <= 768 ? "8rem" : "12rem",
              }}
            >
              JT Lab
            </MainJTLabText>
          </CenteredTextContainer>
          
          {/* Subtitle text with simplified styling */}
          <SubtitleTextContainer>
            <SubtitleText
              $powerGlow={currentGlowLevel === 'power'}
              $darkMode={darkMode}
              initial={{ opacity: 0, x: 0 }}
              animate={{ 
                opacity: swishExit ? 0 : 1,
                x: swishExit ? "100vw" : 0, // Also swish the subtitle text
              }}
              transition={{ 
                opacity: { duration: 0.8 },
                x: { duration: 0.8, ease: "easeIn", delay: 0.05 } // Slight delay for staggered effect
              }}
              style={{
                fontSize: windowWidth <= 768 ? "1.1rem" : "1.3rem",
              }}
            >
              Landing Sites | SPA | PWA | Web | Mobile Optimized
            </SubtitleText>
          </SubtitleTextContainer>
        </>
      )}
    </Container>
  );
};

export default IntroAnimation;