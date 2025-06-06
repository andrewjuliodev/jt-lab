// src/components/Header.tsx
import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import ScrambleLogo from './ScrambleLogo'; // Import our new ScrambleLogo component

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
  DARK_BG_TRANSPARENT: 'rgba(30, 31, 31, 0.85)', 
  LIGHT_BG: '#fff',
  LIGHT_BG_TRANSPARENT: 'rgba(255, 255, 255, 0.9)', 
  WHITE: '#fff',
  BLACK: '#000'
};

// Styled Components
const HeaderContainer = styled.div<{ $darkMode?: boolean; $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  padding: 0 10%;
  z-index: 1000;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.5s ease-in-out, background-color 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out;
  pointer-events: ${props => props.$visible ? 'auto' : 'none'};
  
  /* Glassmorphic effect for both dark and light modes */
  background-color: ${props => props.$darkMode ? COLORS.DARK_BG_TRANSPARENT : COLORS.LIGHT_BG_TRANSPARENT};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: ${props => props.$darkMode 
    ? '0 4px 30px rgba(0, 0, 0, 0.2)' 
    : '0 4px 30px rgba(0, 0, 0, 0.1)'};
  border-bottom: 1px solid ${props => props.$darkMode 
    ? 'rgba(132, 227, 215, 0.15)' 
    : 'rgba(132, 227, 215, 0.2)'};
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

const ThemeToggle = styled.button<{ $darkMode?: boolean }>`
  width: 28px !important;
  height: 28px !important;
  min-width: 28px !important;
  min-height: 28px !important;
  max-width: 28px !important;
  max-height: 28px !important;
  
  background: ${props => props.$darkMode 
    ? 'rgba(132, 227, 215, 0.3)' 
    : 'rgba(0, 0, 0, 0.4)'};
  border: 1px solid ${props => props.$darkMode 
    ? 'rgba(132, 227, 215, 0.5)' 
    : 'rgba(0, 0, 0, 0.5)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 !important;
  margin: 0 !important;
  margin-left: 20px !important; /* Add margin to separate from navbar */
  box-shadow: ${props => props.$darkMode 
    ? '0 0 10px rgba(132, 227, 215, 0.2)' 
    : '0 2px 8px rgba(0, 0, 0, 0.15)'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(132, 227, 215, 0.5);
    background: ${props => props.$darkMode 
      ? 'rgba(132, 227, 215, 0.4)' 
      : 'rgba(0, 0, 0, 0.5)'};
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 14px;
    height: 14px;
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

// Types - added onSectionChange prop
interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  visible: boolean;
  activeSection?: string;
  onLogoClick?: () => void;
  onSectionChange?: (sectionId: string) => void; // New prop for section change
}

/**
 * Header component with scrambling logo effect
 */
const Header: React.FC<HeaderProps> = ({ 
  darkMode, 
  onToggleTheme, 
  visible, 
  activeSection,
  onLogoClick,
  onSectionChange
}) => {
  const handleThemeToggle = () => {
    console.log("Theme toggle clicked, current darkMode:", darkMode);
    onToggleTheme();
  };

  const handleLogoClick = () => {
    console.log("Logo clicked, navigating to home");
    if (onLogoClick) {
      onLogoClick();
    }
  };

  // Section change handler to pass to Navbar
  const handleSectionChange = (sectionId: string) => {
    console.log("Section change in Header:", sectionId);
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
  };

  return (
    <HeaderContainer $darkMode={darkMode} $visible={visible}>
      {/* Left side: Logo with scramble effect */}
      <HeaderLeft>
        <ScrambleLogo 
          darkMode={darkMode}
          onClick={handleLogoClick}
        />
      </HeaderLeft>
      
      {/* Center: Navbar */}
      <NavbarWrapper>
        <Navbar 
          darkMode={darkMode} 
          visible={visible} 
          activeSection={activeSection}
          onSectionChange={handleSectionChange} // Pass the handler to Navbar
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