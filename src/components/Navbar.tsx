// src/components/Navbar.tsx - Optimized for side-by-side display in Header
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
  /* Position it as a regular element to be used inside header */
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
  
  /* Show on desktop, hide on mobile as we'll use the mobile menu */
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavList = styled.ul<{ $mobileMenuOpen?: boolean; $darkMode?: boolean }>`
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  font-weight: 200;
  transition: color 0.8s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const NavItem = styled.li`
  position: relative;
  margin: 0 5px;
`;

const NavLink = styled.a<{ $darkMode?: boolean; $active?: boolean }>`
  /* Keeping black text in light mode */
  color: ${props => props.$darkMode ? COLORS.WHITE : COLORS.BLACK};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem; /* Slightly smaller for better fit in header */
  transition: text-shadow 0.3s ease, color 0.8s ease-in-out;
  padding: 5px 8px;
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
`;

// Mobile navbar components
const MobileNavContainer = styled.div<{ $visible: boolean }>`
  /* Hidden on desktop */
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    opacity: ${props => props.$visible ? 1 : 0};
    transition: opacity 0.5s ease-in-out;
    pointer-events: ${props => props.$visible ? 'auto' : 'none'};
  }
`;

const BurgerMenu = styled.button<{ $darkMode?: boolean; $open?: boolean }>`
  position: fixed;
  top: 23px; /* Center with header height */
  right: 10%;
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1002;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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

const MobileNavList = styled.ul<{ $mobileMenuOpen?: boolean; $darkMode?: boolean }>`
  position: fixed;
  top: 46px; /* Position right below header */
  right: ${props => props.$mobileMenuOpen ? '0' : '-100%'};
  flex-direction: column;
  gap: 1.5rem;
  background: ${props => props.$darkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.7)'};
  width: 70%;
  max-width: 300px;
  height: calc(100vh - 46px);
  padding: 2rem;
  margin: 0;
  list-style: none;
  transition: right 0.3s ease-in-out, background-color 0.8s ease-in-out;
  align-items: center;
  justify-content: flex-start;
  display: flex;
`;

const MobileNavItem = styled.li`
  margin: 10px 0;
  width: 100%;
  text-align: center;
`;

const MobileNavLink = styled.a<{ $darkMode?: boolean; $active?: boolean }>`
  color: #fff; /* Always white for mobile */
  text-decoration: none;
  font-weight: 500;
  font-size: 1.5rem;
  padding: 12px 20px;
  display: inline-block;
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
  
  /* Apply continuous glow animation for active sections */
  ${props => props.$active && css`
    animation: ${continuousGlow} 3s ease-in-out infinite;
  `}
`;

/**
 * Navbar component with navigation links - optimized for side-by-side display
 */
const Navbar: React.FC<NavbarProps> = ({ darkMode, activeSection, visible }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    console.log("Mobile menu toggled", !mobileMenuOpen);
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    console.log("Scrolling to section:", sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Close mobile menu when a link is clicked
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
  };

  // Navigation links for both desktop and mobile
  const navigationLinks = [
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
    { id: 'about', label: 'About' }
  ];

  return (
    <>
      {/* Desktop navbar */}
      <NavbarContainer $visible={visible}>
        <NavList $darkMode={darkMode}>
          {navigationLinks.map(link => (
            <NavItem key={link.id}>
              <NavLink 
                $darkMode={darkMode} 
                href={`#${link.id}`} 
                $active={activeSection === link.id}
                onClick={(e) => scrollToSection(link.id, e)}
              >
                {link.label}
              </NavLink>
            </NavItem>
          ))}
        </NavList>
      </NavbarContainer>
      
      {/* Mobile menu and navbar */}
      <MobileNavContainer $visible={visible}>
        <BurgerMenu 
          $darkMode={darkMode}
          $open={mobileMenuOpen}
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <BurgerLine $darkMode={darkMode} $open={mobileMenuOpen} $lineIndex={1} />
          <BurgerLine $darkMode={darkMode} $open={mobileMenuOpen} $lineIndex={2} />
          <BurgerLine $darkMode={darkMode} $open={mobileMenuOpen} $lineIndex={3} />
        </BurgerMenu>
        
        {/* Mobile nav list */}
        <MobileNavList $mobileMenuOpen={mobileMenuOpen} $darkMode={darkMode}>
          {navigationLinks.map(link => (
            <MobileNavItem key={`mobile-${link.id}`}>
              <MobileNavLink 
                $darkMode={darkMode} 
                href={`#${link.id}`}
                $active={activeSection === link.id}
                onClick={(e) => scrollToSection(link.id, e)}
              >
                {link.label}
              </MobileNavLink>
            </MobileNavItem>
          ))}
        </MobileNavList>
      </MobileNavContainer>
    </>
  );
};

export default Navbar;