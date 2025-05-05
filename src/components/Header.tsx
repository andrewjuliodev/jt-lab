// src/components/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Navbar from './Navbar';

// Constants
export const POSITION = {
  HEADER_TOP: "30px",
  HEADER_LEFT: "10%"
};

export const COLORS = {
  GLOW: 'rgba(132,227,215, 1.0)',
  GLOW_MEDIUM: 'rgba(132,227,215, 0.8)',
  GLOW_LIGHT: 'rgba(132,227,215, 0.6)',
  GLOW_LIGHTER: 'rgba(132,227,215, 0.4)',
  GLOW_LIGHTEST: 'rgba(132,227,215, 0.3)',
  GLOW_FAINT: 'rgba(132,227,215, 0.2)',
  TEXT_DARK: 'rgba(0, 0, 0, 0.7)',
  TEXT_LIGHT: 'rgba(255, 255, 255, 0.7)',
  DARK_BG: 'rgb(30, 31, 31)',
  LIGHT_BG: '#fff',
  WHITE: '#fff',
  BLACK: '#000'
};

export const DURATION = {
  FADE_NORMAL: 0.8,
  BULLET: 1.2,
  GLOW_TRANSITION: 2.0
};

// Animation keyframes - keeping only the ones we use
const continuousGlowBurst = keyframes`
  0% {
    text-shadow:
      0 0 3px ${COLORS.GLOW_LIGHTEST},
      0 0 5px ${COLORS.GLOW_FAINT};
  }
  50% {
    text-shadow:
      0 0 8px ${COLORS.GLOW_MEDIUM},
      0 0 12px ${COLORS.GLOW_LIGHTER},
      0 0 16px ${COLORS.GLOW_LIGHTEST};
  }
  100% {
    text-shadow:
      0 0 3px ${COLORS.GLOW_LIGHTEST},
      0 0 5px ${COLORS.GLOW_FAINT};
  }
`;

const moveBullet = keyframes`
  0% {
    left: -20px;
    width: 20px;
  }
  100% {
    left: 100%;
    width: 20px;
  }
`;

const drawBorder = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

// Types
interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  visible: boolean;
  activeSection?: string;
  initialRender?: boolean;
}

// Styled Components
const HeaderContainer = styled.div<{ $glassmorphism?: boolean; $darkMode?: boolean; $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 998;
  background: ${props => {
    if (props.$glassmorphism && props.$darkMode) return 'rgba(0, 0, 0, 0.5)';
    if (props.$glassmorphism) return 'rgba(0, 0, 0, 0.5)';
    return 'transparent';
  }};
  backdrop-filter: ${props => props.$glassmorphism ? 'blur(10px)' : 'none'};
  -webkit-backdrop-filter: ${props => props.$glassmorphism ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.$glassmorphism ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none'};
  opacity: ${props => props.$visible ? 1 : 0};
  transition: all 0.8s ease-in-out, opacity 0.5s ease-in-out;
`;

const HeaderBorder = styled.div<{ $show: boolean; $darkMode?: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: rgb(132,227,200);
  width: ${props => props.$show ? '100%' : '0'};
  animation: ${props => props.$show ? css`${drawBorder} 1.2s ease-out forwards` : 'none'};
  z-index: 2;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: width 0.2s ease-out;
`;

const HeaderBullet = styled.div<{ $animate: boolean }>`
  position: absolute;
  bottom: -4px;
  width: 20px;
  height: 10px;
  background-color: rgb(132,227,215);
  border-radius: 5px;
  opacity: ${props => props.$animate ? 1 : 0};
  animation: ${props => props.$animate ? css`${moveBullet} 1.2s ease-out forwards` : 'none'};
  box-shadow: 0 0 10px rgb(132,227,215);
  z-index: 2;
`;

const DarkModeBullet = styled.div<{ $animate: boolean }>`
  position: absolute;
  bottom: -4px;
  width: 20px;
  height: 10px;
  background-color: rgb(132,227,215);
  border-radius: 5px;
  opacity: ${props => props.$animate ? 1 : 0};
  animation: ${props => props.$animate ? css`${moveBullet} 1.2s ease-out forwards` : 'none'};
  box-shadow: 0 0 15px rgb(132,227,215), 0 0 30px rgb(132,227,215);
  z-index: 2;
`;

const ThemeToggle = styled.button<{ $darkMode?: boolean; $visible?: boolean }>`
  position: fixed;
  top: 30px;
  right: 10%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  background: ${props => props.$darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)'};
  border: 2px solid ${props => props.$darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.5)'};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  outline: none;
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  opacity: ${props => props.$visible ? 1 : 0};
  z-index: 9999;
  box-shadow: ${props => props.$darkMode 
    ? '0 0 15px rgba(255, 255, 255, 0.3), 0 0 5px rgba(132, 227, 215, 0.4)' 
    : '0 4px 15px rgba(0, 0, 0, 0.3), 0 0 5px rgba(132, 227, 215, 0.3)'};
  
  &:hover {
    background: ${props => props.$darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)'};
    box-shadow: 0 0 15px rgba(132, 227, 215, 0.6), 0 0 30px rgba(132, 227, 215, 0.4);
    transform: translateY(-50%) scale(1.08);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }
  
  @media (max-width: 768px) {
    right: 25%;
  }
`;

const Logo = styled.div<{ $darkMode: boolean }>`
  position: fixed;
  top: 30px;
  left: 10%;
  transform: translateY(-50%);
  font-family: "Cal Sans", sans-serif;
  font-size: 2.2rem;
  font-weight: bold;
  color: ${props => props.$darkMode ? COLORS.WHITE : COLORS.BLACK};
  cursor: pointer;
  z-index: 1001;
  animation: ${css`${continuousGlowBurst} 3s ease-in-out infinite`};
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  
  &:hover {
    text-shadow: 
      0 0 5px rgb(58, 186, 170),
      0 0 10px rgb(58, 186, 170),
      0 0 15px rgb(58, 186, 170);
  }
`;

// SVG Icons
const SunIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5" stroke="#fff" strokeWidth="2"/>
    <path d="M12 4V2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 22V20" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 12H22" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    <path d="M2 12H4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    <path d="M19.1421 5.44446L20.5563 4.03024" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3.94366 20.5563L5.35788 19.1421" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    <path d="M19.1421 19.1421L20.5563 20.5563" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3.94366 4.03024L5.35788 5.44446" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(0, 0, 0, 0.3)" />
  </svg>
);

/**
 * Header component with navigation and theme toggle
 */
const Header: React.FC<HeaderProps> = ({ darkMode, onToggleTheme, visible, activeSection, initialRender = true }) => {
  const [headerBorderVisible] = useState(true);
  const [animateLightBullet, setAnimateLightBullet] = useState(false);
  const [animateDarkBullet, setAnimateDarkBullet] = useState(false);
  const isFirstRender = useRef(true);
  
  // Handle theme toggle with bullet animation
  const handleThemeToggle = () => {
    // Only trigger the bullet animation when it's a user-initiated theme change
    const newDarkMode = !darkMode;
    if (newDarkMode) {
      setAnimateDarkBullet(true);
      setTimeout(() => {
        setAnimateDarkBullet(false);
      }, DURATION.BULLET * 1000);
    } else {
      setAnimateLightBullet(true);
      setTimeout(() => {
        setAnimateLightBullet(false);
      }, DURATION.BULLET * 1000);
    }
    
    onToggleTheme();
  };

  // Effect to handle initial bullet animation (only once)
  useEffect(() => {
    // Only run the initial bullet animation if:
    // 1. The component is visible (after intro animation)
    // 2. It's the first time the component is rendered
    // 3. The initialRender prop is true (we're not in the App.tsx after animation)
    if (visible && isFirstRender.current && initialRender) {
      // Run the initial bullet animation only once
      if (!darkMode) {
        setAnimateLightBullet(true);
        setTimeout(() => {
          setAnimateLightBullet(false);
        }, DURATION.BULLET * 1000);
      } else {
        setAnimateDarkBullet(true);
        setTimeout(() => {
          setAnimateDarkBullet(false);
        }, DURATION.BULLET * 1000);
      }
      isFirstRender.current = false;
    }
  }, [visible, darkMode, initialRender]);

  return (
    <>
      <HeaderContainer 
        $darkMode={darkMode} 
        $glassmorphism={true}
        $visible={visible}
      >
        <HeaderBorder $show={headerBorderVisible} $darkMode={darkMode} />
        <HeaderBullet $animate={animateLightBullet} />
        <DarkModeBullet $animate={animateDarkBullet} />
      </HeaderContainer>

      {/* Logo */}
      <Logo 
        $darkMode={darkMode}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
      >
        JT Lab
      </Logo>

      {/* Theme toggle button */}
      <ThemeToggle
        $darkMode={darkMode}
        $visible={visible}
        onClick={handleThemeToggle}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </ThemeToggle>
      
      {/* Use the Navbar component for navigation */}
      <Navbar 
        darkMode={darkMode}
        visible={visible}
        activeSection={activeSection}
      />
    </>
  );
};

export default Header;