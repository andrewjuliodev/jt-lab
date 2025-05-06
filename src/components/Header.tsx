// src/components/Header.tsx - With slightly larger navbar and toggle button
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Navbar from './Navbar'; // Import the Navbar component

// Constants
const COLORS = {
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

// Animation keyframes
const continuousGlowBurst = keyframes`
  0% {
    text-shadow:
      0 0 4px ${COLORS.GLOW_LIGHTEST},
      0 0 7px ${COLORS.GLOW_FAINT};
  }
  50% {
    text-shadow:
      0 0 8px ${COLORS.GLOW_MEDIUM},
      0 0 12px ${COLORS.GLOW_LIGHTER},
      0 0 16px ${COLORS.GLOW_LIGHTEST};
  }
  100% {
    text-shadow:
      0 0 4px ${COLORS.GLOW_LIGHTEST},
      0 0 7px ${COLORS.GLOW_FAINT};
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
  height: 54px; /* Increased from 46px */
  display: flex;
  align-items: center;
  padding: 0 10%;
  z-index: 1000;
  background: transparent;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
  pointer-events: ${props => props.$visible ? 'auto' : 'none'};
`;

const HeaderLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Logo = styled.div<{ $darkMode: boolean }>`
  font-family: "Cal Sans", sans-serif;
  font-size: 1.8rem;
  font-weight: bold;
  color: ${props => props.$darkMode ? COLORS.WHITE : COLORS.BLACK};
  cursor: pointer;
  animation: ${css`${continuousGlowBurst} 3s ease-in-out infinite`};
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  &:hover {
    text-shadow: 
      0 0 5px rgb(58, 186, 170),
      0 0 10px rgb(58, 186, 170),
      0 0 15px rgb(58, 186, 170);
  }
`;

const ThemeToggle = styled.button<{ $darkMode?: boolean }>`
  /* Increased size */
  width: 28px !important; /* Increased from 24px */
  height: 28px !important; /* Increased from 24px */
  min-width: 28px !important; /* Increased from 24px */
  min-height: 28px !important; /* Increased from 24px */
  max-width: 28px !important; /* Increased from 24px */
  max-height: 28px !important; /* Increased from 24px */
  
  /* Styling */
  background: ${props => props.$darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)'};
  border: 1px solid ${props => props.$darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.5)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 !important;
  margin: 0 !important;
  margin-left: 20px !important; /* Add margin to separate from navbar */
  box-shadow: ${props => props.$darkMode 
    ? '0 0 8px rgba(255, 255, 255, 0.2)' 
    : '0 2px 8px rgba(0, 0, 0, 0.15)'};
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(132, 227, 215, 0.4);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 14px; /* Increased from 12px */
    height: 14px; /* Increased from 12px */
  }
`;

// Navigation-specific styles that won't conflict with Navbar component
const NavbarWrapper = styled.div`
  display: flex;
  justify-content: center;
  
  /* Hide the navbar wrapper on mobile */
  @media (max-width: 768px) {
    display: none;
  }
`;

/**
 * Header component with Navbar integrated properly
 */
const Header: React.FC<HeaderProps> = ({ darkMode, onToggleTheme, visible, activeSection }) => {
  const handleThemeToggle = () => {
    console.log("Theme toggle clicked, current darkMode:", darkMode);
    onToggleTheme();
  };

  const handleLogoClick = () => {
    console.log("Logo clicked, scrolling to top");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <HeaderContainer $darkMode={darkMode} $visible={visible}>
      {/* Left side: Logo */}
      <HeaderLeft>
        <Logo 
          $darkMode={darkMode}
          onClick={handleLogoClick}
        >
          JT Lab
        </Logo>
      </HeaderLeft>
      
      {/* Center: Navbar */}
      <NavbarWrapper>
        <Navbar 
          darkMode={darkMode} 
          visible={visible} 
          activeSection={activeSection}
        />
      </NavbarWrapper>
      
      {/* Right side: Theme toggle */}
      <HeaderRight>
        <ThemeToggle
          $darkMode={darkMode}
          onClick={handleThemeToggle}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="5" stroke="#fff" strokeWidth="2"/>
              <path d="M12 4V2M12 22V20M20 12H22M2 12H4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(0, 0, 0, 0.3)" />
            </svg>
          )}
        </ThemeToggle>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;