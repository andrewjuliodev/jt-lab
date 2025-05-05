// src/components/Navbar.tsx - Revert to previous height, keep black text color in light mode
import React, { useState } from 'react';
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
const glowBurst = keyframes`
  0% {
    text-shadow:
      0 0 2px ${COLORS.GLOW_LIGHTEST},
      0 0 5px ${COLORS.GLOW_FAINT};
  }
  50% {
    text-shadow:
      0 0 10px ${COLORS.GLOW_MEDIUM},
      0 0 20px ${COLORS.GLOW_LIGHT},
      0 0 30px ${COLORS.GLOW_LIGHTER};
  }
  100% {
    text-shadow:
      0 0 5px ${COLORS.GLOW_LIGHTER},
      0 0 8px ${COLORS.GLOW_LIGHTEST};
  }
`;

const continuousGlow = keyframes`
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

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

// Types - Keep NavbarProps separate from HeaderProps
interface NavbarProps {
  darkMode: boolean;
  activeSection?: string;
  visible: boolean;
}

// Styled Components
const NavbarContainer = styled.nav<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 42px; /* Reverted back to original height */
  z-index: 1000;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
  pointer-events: ${props => props.$visible ? 'auto' : 'none'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavbarGlow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, transparent, ${COLORS.GLOW}, transparent);
  opacity: 0.6;
`;

const NavList = styled.ul<{ $mobileMenuOpen?: boolean; $darkMode?: boolean }>`
  display: flex;
  gap: 3rem;
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  font-weight: 200;
  transition: color 0.8s ease-in-out;
  /* Enhanced glassmorphism for navbar only */
  background: ${props => props.$darkMode ? 
    'rgba(0, 0, 0, 0.7)' : 
    'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 7px 30px; /* Reverted to original padding */
  border-radius: 25px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 42px; /* Reverted to match original navbar height */
    right: ${props => props.$mobileMenuOpen ? '0' : '-100%'};
    flex-direction: column;
    gap: 1.5rem;
    background: ${props => props.$darkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.7)'};
    width: 70%;
    max-width: 300px;
    height: calc(100vh - 42px); /* Reverted to match original navbar height */
    padding: 2rem;
    margin-left: 0;
    transition: right 0.3s ease-in-out, background-color 0.8s ease-in-out;
    align-items: center;
    justify-content: flex-start;
    border-radius: 0;
  }
`;

const NavItem = styled.li`
  position: relative;
  margin: 0 5px;
  
  @media (max-width: 768px) {
    margin: 10px 0;
    width: 100%;
    text-align: center;
  }
`;

const NavLink = styled.a<{ $darkMode?: boolean; $active?: boolean }>`
  /* Keeping black text in light mode */
  color: ${props => props.$darkMode ? COLORS.WHITE : COLORS.BLACK};
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: text-shadow 0.3s ease, color 0.8s ease-in-out;
  padding: 5px 12px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.$active ? '50%' : '0'};
    height: 2px;
    background-color: rgb(132,227,215);
    transition: width 0.3s ease;
  }
  
  &:hover {
    animation: ${css`${glowBurst} 1s ease-out infinite`};
    
    &::after {
      width: 50%;
    }
  }
  
  /* Apply continuous glow animation for active sections instead of font-weight */
  ${props => props.$active && css`
    animation: ${continuousGlow} 3s ease-in-out infinite;
  `}
  
  @media (max-width: 768px) {
    color: #fff; /* Keep mobile menu text white */
    font-size: 1.5rem;
    padding: 12px 20px;
    display: inline-block;
  }
`;

const BurgerMenu = styled.button<{ $darkMode?: boolean; $open?: boolean }>`
  display: none;
  position: fixed;
  top: 21px; /* Reverted to original position */
  right: 10%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1002;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`;

const BurgerLine = styled.span<{ $darkMode?: boolean; $open?: boolean; $lineIndex?: number }>`
  width: 30px;
  height: 3px;
  background-color: ${props => props.$darkMode ? COLORS.WHITE : '#333'};
  transition: all 0.3s ease-in-out;
  position: relative;
  
  transform: ${props => {
    if (props.$open && props.$lineIndex === 1) return 'rotate(45deg) translate(5px, 5px)';
    if (props.$open && props.$lineIndex === 3) return 'rotate(-45deg) translate(5px, -5px)';
    if (props.$open && props.$lineIndex === 2) return 'opacity: 0';
    return 'none';
  }};
  
  opacity: ${props => props.$open && props.$lineIndex === 2 ? 0 : 1};
`;

/**
 * Navbar component with navigation links
 */
const Navbar: React.FC<NavbarProps> = ({ darkMode, activeSection, visible }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    const element = document.getElementById(sectionId);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile menu burger */}
      <BurgerMenu 
        $darkMode={darkMode}
        $open={mobileMenuOpen}
        onClick={toggleMobileMenu}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
      >
        <BurgerLine $darkMode={darkMode} $open={mobileMenuOpen} $lineIndex={1} />
        <BurgerLine $darkMode={darkMode} $open={mobileMenuOpen} $lineIndex={2} />
        <BurgerLine $darkMode={darkMode} $open={mobileMenuOpen} $lineIndex={3} />
      </BurgerMenu>
      
      {/* Main navbar */}
      <NavbarContainer $visible={visible}>
        <NavbarGlow />
        <NavList $mobileMenuOpen={mobileMenuOpen} $darkMode={darkMode}>
          <NavItem>
            <NavLink 
              $darkMode={darkMode} 
              href="#services" 
              $active={activeSection === 'services'}
              onClick={(e) => scrollToSection('services', e)}
            >
              Services
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink 
              $darkMode={darkMode} 
              href="#portfolio"
              $active={activeSection === 'portfolio'}
              onClick={(e) => scrollToSection('portfolio', e)}
            >
              Portfolio
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink 
              $darkMode={darkMode} 
              href="#contact"
              $active={activeSection === 'contact'}
              onClick={(e) => scrollToSection('contact', e)}
            >
              Contact
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink 
              $darkMode={darkMode} 
              href="#about"
              $active={activeSection === 'about'}
              onClick={(e) => scrollToSection('about', e)}
            >
              About
            </NavLink>
          </NavItem>
        </NavList>
      </NavbarContainer>
    </>
  );
};

export default Navbar;