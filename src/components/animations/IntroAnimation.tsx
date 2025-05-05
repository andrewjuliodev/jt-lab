// src/components/animations/IntroAnimation.tsx
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import ScrambleText from './ScrambleText';

interface IntroAnimationProps {
  onComplete: () => void;
  onThemeToggle: (isDarkMode: boolean) => void;
  darkMode: boolean;
}

// Constants
const POSITION = {
  VERTICAL_ADJUSTMENT_TITLE: "-22vh",
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

// Styled components
const Container = styled.div<{ darkMode?: boolean; lightTheme?: boolean }>`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: ${props => {
    if (props.darkMode) return 'rgb(30, 31, 31)';
    if (props.lightTheme) return '#fff';
    return '#fff';
  }};
  color: ${props => props.darkMode ? '#fff' : '#000'};
  overflow: hidden;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
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
  blur?: string;
  fontSize?: string;
}>`
  position: absolute;
  display: inline-flex;
  font-family: "Cal Sans", sans-serif;
  font-size: ${props => props.fontSize || "4.5rem"};
  font-weight: bold;
  color: #000;
  filter: ${({ blur }) => blur || "none"};
  z-index: 3;
  white-space: nowrap;
  transition: font-size 0.8s ease-in-out, color 0.5s ease-in-out;
  
  @media (max-width: 768px) {
    font-size: ${props => props.fontSize === "2.2rem" ? "1.8rem" : "3.5rem"};
  }
  
  @media (max-width: 480px) {
    font-size: ${props => props.fontSize === "2.2rem" ? "1.5rem" : "2.5rem"};
  }
`;

const CenteredTextContainer = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  text-align: center;
  z-index: 20;
  
  @media (max-width: 768px) {
    top: 35%;
  }
`;

const SubtitleTextContainer = styled.div`
  position: fixed;
  top: calc(40% + 9vh);
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  max-width: 90%;
  text-align: center;
  z-index: 5;
  font-family: "Montserrat", sans-serif;
  font-size: 1.3rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.7);
  transition: color 0.4s ease-in-out;
  
  @media (max-width: 768px) {
    top: calc(35% + 9vh);
    font-size: 1.1rem;
    max-width: 95%;
  }
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
  const ANIMATION_TIMINGS = {
    INITIAL_ELEMENTS: 1000,
    SUBTITLE_TEXT: 1100,
    START_RETRACTION: 2750,
    HIDE_RETRACTED_JT: 3900,
    POWER_GLOW_BURST: 5250,
    FINAL_GLOW: 5500,
    ANIMATION_COMPLETE: 6000
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
    
    // Set a longer display time (4 seconds total)
    setTimeout(() => {
      console.log("[Animation] Applying power glow after delay at:", Date.now());
      setCurrentGlowLevel('power');
      
      setTimeout(() => {
        console.log("[Animation] Switching to continuous glow at:", Date.now());
        setCurrentGlowLevel('continuous');
        
        // After the extended display period (full 4 seconds from switching to continuous glow)
        // then start exit animation
        setTimeout(() => {
          // Start the exit animation for all elements simultaneously
          setSwishExit(true);
          setImageExit(true);
          
          // Delay the completion callback until after the exit animation
          setTimeout(onComplete, 900);
        }, 4000);
      }, 200);
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
      }, ANIMATION_TIMINGS.START_RETRACTION),
      
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
    <Container darkMode={darkMode} lightTheme={lightTheme && !darkMode}>
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
        blur={blur}
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
          
          {/* Subtitle text below Web Dev */}
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
                  display: "inline-block"
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
          
          <SubtitleTextContainer>
            <ScrambleText 
              startText="Crafting Custom Websites: Business, E-commerce, Portfolios & More"
              endText="Landing Sites | SPA | PWA | Web | Mobile Optimized"
              duration={1000}
              color={darkMode ? COLORS.TEXT_LIGHT : COLORS.TEXT_DARK}
              fontSize={windowWidth <= 768 ? "1.1rem" : "1.2rem"}
              style={{ fontWeight: 400 }}
            />
          </SubtitleTextContainer>
        </>
      )}

      {/* JT Lab in center position with swish exit animation */}
      {mainJTLabText && (
        <>
          <CenteredTextContainer>
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ 
                opacity: swishExit ? 0 : 1,
                x: swishExit ? "100vw" : 0, // Animate to right side of screen
                color: darkMode ? '#fff' : '#000'
              }}
              transition={{ 
                opacity: { duration: 0.8 },
                x: { duration: 0.8, ease: "easeIn" } // Use easeIn for acceleration effect
              }}
              style={{
                fontFamily: "Cal Sans, sans-serif",
                fontSize: windowWidth <= 768 ? "8rem" : "12rem",
                fontWeight: "bold",
                textShadow: currentGlowLevel === 'power' 
                  ? `0 0 30px ${COLORS.GLOW}, 0 0 60px ${COLORS.GLOW}, 0 0 90px ${COLORS.GLOW_MEDIUM}, 0 0 120px ${COLORS.GLOW_MEDIUM}`
                  : (currentGlowLevel === 'continuous'
                    ? `0 0 8px ${COLORS.GLOW_MEDIUM}, 0 0 12px ${COLORS.GLOW_LIGHTER}, 0 0 16px ${COLORS.GLOW_LIGHTEST}`
                    : `0 0 10px ${COLORS.GLOW_MEDIUM}, 0 0 20px ${COLORS.GLOW_LIGHT}, 0 0 30px ${COLORS.GLOW_LIGHTER}`),
                WebkitTextFillColor: darkMode ? 'white' : 'black',
                WebkitTextStroke: '0.5px ' + (darkMode ? 'white' : 'black'),
                transition: "color 0.3s ease-in-out, text-shadow 0.3s ease-in-out",
                transform: "translateZ(0)" // Force GPU acceleration for smoother animation
              }}
            >
              JT Lab
            </motion.div>
          </CenteredTextContainer>
          
          <SubtitleTextContainer>
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ 
                opacity: swishExit ? 0 : 1,
                x: swishExit ? "100vw" : 0, // Also swish the subtitle text
                color: darkMode ? COLORS.TEXT_LIGHT : COLORS.TEXT_DARK
              }}
              transition={{ 
                opacity: { duration: 0.8 },
                x: { duration: 0.8, ease: "easeIn", delay: 0.05 } // Slight delay for staggered effect
              }}
              style={{
                fontWeight: 400,
                fontSize: windowWidth <= 768 ? "1.1rem" : "1.3rem",
                transform: "translateZ(0)" // Force GPU acceleration
              }}
            >
              Landing Sites | SPA | PWA | Web | Mobile Optimized
            </motion.div>
          </SubtitleTextContainer>
        </>
      )}
    </Container>
  );
};

export default IntroAnimation;