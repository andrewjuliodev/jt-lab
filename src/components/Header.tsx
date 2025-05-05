// src/components/Header.tsx - Increased header height by an additional 1%
import React, { useState, useEffect } from 'react';
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
}

// Styled Components
const HeaderContainer = styled.div<{ $darkMode?: boolean; $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 46px; /* Increased by an additional 1% (from 42px to 46px) */
  z-index: 998;
  /* Header is now transparent */
  background: transparent;
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
  top: 23px; /* Adjusted to match increased header height */
  right: 10%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
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
  top: 23px; /* Adjusted to match increased header height */
  left: 10%;
  transform: translateY(-50%);
  font-family: "Cal Sans", sans-serif;
  font-size: 1.8rem;
  font-weight: bold;
  color: ${props => props.$darkMode ? COLORS.WHITE : COLORS.BLACK};
  cursor: pointer;
  z-index: 1001;
  /* Enhanced continuous glow animation for minimum state */
  animation: ${css`${continuousGlowBurst} 3s ease-in-out infinite`};
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  /* Enhanced hover glow effect */
  &:hover {
    text-shadow: 
      0 0 5px rgb(58, 186, 170),
      0 0 10px rgb(58, 186, 170),
      0 0 15px rgb(58, 186, 170),
      0 0 20px rgba(58, 186, 170, 0.5); /* Added extra layer of glow */
  }
`;

// SVG Icons
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(0, 0, 0, 0.3)" />
  </svg>
);

/**
 * Header component with navigation and theme toggle
 */
const Header: React.FC<HeaderProps> = ({ darkMode, onToggleTheme, visible, activeSection }) => {
  // Use a constant instead of useState to fix the "unused setter" error
  const headerBorderVisible = true;
  const [animateLightBullet, setAnimateLightBullet] = useState(false);
  const [animateDarkBullet, setAnimateDarkBullet] = useState(false);
  
  // We no longer need the initial bullet animation effect
  // The bullet animation will only be triggered when the theme toggle is used
  useEffect(() => {
    // No initialization needed
  }, []);

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

  return (
    <>
      <HeaderContainer 
        $darkMode={darkMode} 
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
      
      {/* Use the Navbar component for navigation - only pass the needed props */}
      <Navbar 
        darkMode={darkMode}
        visible={visible}
        activeSection={activeSection}
      />
    </>
  );
};

export default Header;