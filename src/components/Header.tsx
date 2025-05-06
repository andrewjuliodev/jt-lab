// src/components/Header.tsx - Fixed alignment of all elements
import React from 'react';
import styled, { keyframes, css } from 'styled-components';

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
  height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
  z-index: 1000;
  background: transparent;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
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
  /* Fixed size */
  width: 24px !important;
  height: 24px !important;
  min-width: 24px !important;
  min-height: 24px !important;
  max-width: 24px !important;
  max-height: 24px !important;
  
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
    width: 12px;
    height: 12px;
  }
`;

/**
 * Simplified Header component
 */
const Header: React.FC<HeaderProps> = ({ darkMode, onToggleTheme, visible }) => {
  return (
    <HeaderContainer $darkMode={darkMode} $visible={visible}>
      {/* Logo */}
      <Logo 
        $darkMode={darkMode}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        JT Lab
      </Logo>

      {/* Theme toggle button */}
      <ThemeToggle
        $darkMode={darkMode}
        onClick={onToggleTheme}
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
    </HeaderContainer>
  );
};

export default Header;