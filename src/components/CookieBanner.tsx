// src/components/CookieBanner.tsx - Complete file with 50px PNG cookie icon
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CookieSettingsModal from './CookieSettingsModal';

// Constants
const COLORS = {
  GLOW: 'rgba(132,227,215, 1.0)',
  GLOW_MEDIUM: 'rgba(132,227,215, 0.8)',
  GLOW_LIGHT: 'rgba(132,227,215, 0.6)',
  GLOW_LIGHTER: 'rgba(132,227,215, 0.4)',
  DARK_TEXT: '#333',
  LIGHT_TEXT: '#fff',
  DARK_BG: 'rgb(30, 31, 31)',
  LIGHT_BG: '#fff'
};

interface CookieBannerProps {
  darkMode: boolean;
  visible: boolean;
}

interface CookieSettings {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

// Styled components for cookie banner
const BannerContainer = styled.div<{ $visible: boolean; $darkMode: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 10%;
  background-color: ${props => props.$darkMode 
    ? 'rgba(30, 31, 31, 0.95)' 
    : 'rgba(255, 255, 255, 0.95)'};
  color: ${props => props.$darkMode ? COLORS.LIGHT_TEXT : COLORS.DARK_TEXT};
  z-index: 2000; /* Increased z-index to ensure visibility */
  transform: translateY(${props => props.$visible ? '0' : '100%'});
  transition: transform 0.5s ease-in-out;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-top: 1px solid ${props => props.$darkMode 
    ? 'rgba(132, 227, 215, 0.15)' 
    : 'rgba(132, 227, 215, 0.2)'};
  max-height: 120px; /* Increased height for better visibility */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 1.5rem 5%;
    flex-direction: column;
    max-height: none;
    align-items: flex-start;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
  }
`;

const InfoText = styled.p`
  font-size: 0.95rem;
  margin: 0;
  flex: 1;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Button = styled.button<{ $darkMode: boolean; $primary?: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$primary 
    ? COLORS.GLOW_MEDIUM 
    : props.$darkMode ? 'rgba(132, 227, 215, 0.15)' : 'rgba(132, 227, 215, 0.25)'};
  color: ${props => props.$primary 
    ? (props.$darkMode ? COLORS.DARK_BG : COLORS.LIGHT_TEXT) 
    : (props.$darkMode ? COLORS.LIGHT_TEXT : COLORS.DARK_TEXT)};
  border: ${props => props.$primary 
    ? 'none' 
    : `1px solid ${props.$darkMode ? 'rgba(132, 227, 215, 0.3)' : 'rgba(132, 227, 215, 0.4)'}`};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(132, 227, 215, 0.3);
    background: ${props => props.$primary 
      ? COLORS.GLOW 
      : props.$darkMode ? 'rgba(132, 227, 215, 0.25)' : 'rgba(132, 227, 215, 0.35)'};
  }
  
  @media (max-width: 768px) {
    flex: 1;
    text-align: center;
    padding: 0.75rem 0.5rem;
    font-size: 0.9rem;
  }
`;

const SettingsButton = styled(Button)`
  @media (max-width: 768px) {
    flex: 0.9;
  }
`;

// Persistent cookie settings icon
const SettingsIcon = styled.div<{ $darkMode: boolean; $visible: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: ${props => props.$visible ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2000; /* Increased z-index to ensure visibility */
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px) rotate(5deg);
    filter: drop-shadow(0 6px 12px rgba(132, 227, 215, 0.4));
  }
  
  img {
    width: 35px;
    height: 35px;
  }
`;

// Main Cookie Banner Component
const CookieBanner: React.FC<CookieBannerProps> = ({ darkMode, visible }) => {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [settingsIconVisible, setSettingsIconVisible] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  // Check for existing consent in localStorage on mount
  useEffect(() => {
    console.log("CookieBanner component mounted");
    console.log("visible prop:", visible);
    
    if (visible) {
      const hasConsent = localStorage.getItem('cookieConsent');
      console.log("Existing consent in localStorage:", hasConsent);
      
      if (!hasConsent) {
        console.log("No consent found, showing banner");
        setBannerVisible(true);
        setSettingsIconVisible(false);
      } else {
        console.log("Consent found, showing settings icon");
        setBannerVisible(false);
        setSettingsIconVisible(true);
      }
    }
  }, [visible]);
  
  // Handle accept all cookies
  const handleAcceptAll = () => {
    console.log("Accept all clicked");
    
    // Save consent in localStorage
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }));
    
    // Hide banner and show settings icon
    setBannerVisible(false);
    setSettingsIconVisible(true);
  };
  
  // Handle reject all non-essential cookies
  const handleRejectAll = () => {
    console.log("Reject all clicked");
    
    // Save minimal consent in localStorage
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    
    // Hide banner and show settings icon
    setBannerVisible(false);
    setSettingsIconVisible(true);
  };
  
  // Handle cookie settings click in banner
  const handleOpenSettings = () => {
    console.log("Settings clicked");
    
    // Open the settings modal and hide the banner
    setShowSettingsModal(true);
    setBannerVisible(false);
  };
  
  // Handle close of settings modal
  const handleCloseSettingsModal = () => {
    console.log("Modal closed");
    
    setShowSettingsModal(false);
    setSettingsIconVisible(true);
  };
  
  // Handle save of cookie settings
  const handleSaveSettings = (settings: CookieSettings) => {
    console.log("Settings saved:", settings);
    
    // Save the settings to localStorage
    localStorage.setItem('cookieConsent', JSON.stringify({
      ...settings,
      timestamp: new Date().toISOString()
    }));
    
    // Hide modal and show settings icon
    setShowSettingsModal(false);
    setSettingsIconVisible(true);
  };
  
  // Handle cookie policy link click
  const handleCookiePolicyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default behavior
    
    // Navigate to datenschutz page by triggering a click on the data protection button in the about section
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
      
      // Small delay to ensure the section is loaded
      setTimeout(() => {
        // Find all buttons in the about section
        const buttons = aboutSection.querySelectorAll('button');
        
        // Find the data protection button
        buttons.forEach(button => {
          if (button.textContent === 'Data Protection') {
            button.click();
          }
        });
      }, 500);
    }
  };
  
  return (
    <>
      {/* Main banner */}
      <BannerContainer $visible={bannerVisible} $darkMode={darkMode}>
        <ContentContainer>
          <InfoText>
            We use cookies to improve your browsing experience. Some cookies are necessary for the website to function while others help us understand how you interact with our site.
            {' '}
            <a 
              href="#datenschutz" 
              style={{ color: COLORS.GLOW, textDecoration: 'underline' }}
              onClick={handleCookiePolicyClick}
            >
              Cookie Policy
            </a>
          </InfoText>
        </ContentContainer>
        
        <ButtonsContainer>
          <Button $darkMode={darkMode} onClick={handleRejectAll}>
            Reject All
          </Button>
          <SettingsButton $darkMode={darkMode} onClick={handleOpenSettings}>
            Settings
          </SettingsButton>
          <Button $darkMode={darkMode} $primary onClick={handleAcceptAll}>
            Accept All
          </Button>
        </ButtonsContainer>
      </BannerContainer>
      
      {/* Persistent settings icon */}
      <SettingsIcon 
        $darkMode={darkMode} 
        $visible={settingsIconVisible}
        onClick={handleOpenSettings}
        aria-label="Cookie Settings"
        title="Cookie Settings"
      >
        <img src="/cookie.png" alt="Cookie Settings" />
      </SettingsIcon>
      
      {/* Cookie Settings Modal */}
      <CookieSettingsModal
        darkMode={darkMode}
        isOpen={showSettingsModal}
        onClose={handleCloseSettingsModal}
        onSave={handleSaveSettings}
      />
    </>
  );
};

export default CookieBanner;