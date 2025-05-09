// src/components/CookieSettingsModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

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

interface CookieSettingsModalProps {
  darkMode: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: CookieSettings) => void;
}

// Updated interface to match your existing consent structure
interface CookieSettings {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

// Styled components for modal
const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 2100; /* Higher than banner */
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContainer = styled.div<{ $darkMode: boolean }>`
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden; /* Changed from overflow-y: auto to prevent body scrolling */
  background-color: ${props => props.$darkMode ? 'rgb(30, 31, 31)' : '#fff'};
  color: ${props => props.$darkMode ? COLORS.LIGHT_TEXT : COLORS.DARK_TEXT};
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 0; /* Removed padding from container to better control internal scroll */
  position: relative;
  border: 1px solid ${props => props.$darkMode 
    ? 'rgba(132, 227, 215, 0.3)' 
    : 'rgba(132, 227, 215, 0.4)'};
  
  @media (max-width: 768px) {
    width: 95%;
  }
`;

const ModalHeader = styled.div<{ $darkMode: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
  border-bottom: 1px solid ${props => props.$darkMode 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.1)'};
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  background-color: ${props => props.$darkMode ? 'rgb(30, 31, 31)' : '#fff'};
  z-index: 1;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: ${COLORS.GLOW_MEDIUM};
  margin: 0;
  font-family: "Cal Sans", sans-serif;
`;

const CloseButton = styled.button<{ $darkMode: boolean }>`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.$darkMode ? COLORS.LIGHT_TEXT : COLORS.DARK_TEXT};
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  
  &:hover {
    color: ${COLORS.GLOW_MEDIUM};
  }
`;

const ModalBody = styled.div`
  padding: 0 2rem;
  margin-bottom: 0;
  overflow-y: auto; /* This is the scrollable container */
  max-height: calc(90vh - 150px); /* Adjust based on header and footer height */
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
    max-height: calc(90vh - 180px);
  }
`;

const ModalDescription = styled.p`
  margin: 1.5rem 0;
  line-height: 1.4;
  font-size: 0.95rem;
`;

const CookieTypes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 1rem;
`;

const CookieTypeItem = styled.div<{ $darkMode: boolean }>`
  border: 1px solid ${props => props.$darkMode 
    ? 'rgba(132, 227, 215, 0.2)' 
    : 'rgba(132, 227, 215, 0.3)'};
  border-radius: 8px;
  padding: 1.5rem;
  background-color: ${props => props.$darkMode 
    ? 'rgba(0, 0, 0, 0.2)' 
    : 'rgba(255, 255, 255, 0.6)'};
`;

const CookieTypeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const CookieTypeName = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  color: ${COLORS.GLOW_MEDIUM};
`;

const CookieTypeDescription = styled.p`
  font-size: 0.95rem;
  margin: 0.5rem 0 1rem;
  line-height: 1.5;
`;

const ToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
  cursor: pointer;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: ${COLORS.GLOW_MEDIUM};
  }
  
  &:checked + span:before {
    transform: translateX(24px);
  }
  
  &:disabled + span {
    background-color: rgba(132, 227, 215, 0.4);
    cursor: not-allowed;
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(132, 227, 215, 0.2);
  transition: .4s;
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

const CookieDetails = styled.div`
  margin-top: 1rem;
  font-size: 0.85rem;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;

const DetailLabel = styled.span`
  color: ${COLORS.GLOW_LIGHT};
  margin-bottom: 0.2rem;
  font-weight: 500;
`;

const DetailValue = styled.span`
  opacity: 0.8;
`;

const ModalFooter = styled.div<{ $darkMode: boolean }>`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${props => props.$darkMode 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.1)'};
  padding: 1.5rem 2rem;
  position: sticky;
  bottom: 0;
  background-color: ${props => props.$darkMode ? 'rgb(30, 31, 31)' : '#fff'};
  z-index: 1;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }
`;

const Button = styled.button<{ $darkMode: boolean; $primary?: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
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
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

// Cookie Settings Modal Component
const CookieSettingsModal: React.FC<CookieSettingsModalProps> = ({ 
  darkMode, 
  isOpen, 
  onClose,
  onSave
}) => {
  // Load saved preferences or use defaults
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true, // Always enabled
    functional: false,
    analytics: false,
    marketing: false
  });

  // Use ref to capture modal overlay element
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // Load existing consent on open
  useEffect(() => {
    if (isOpen) {
      const savedConsent = localStorage.getItem('cookieConsent');
      if (savedConsent) {
        try {
          const parsedConsent = JSON.parse(savedConsent);
          setSettings({
            necessary: true, // Always true
            functional: parsedConsent.functional || false,
            analytics: parsedConsent.analytics || false,
            marketing: parsedConsent.marketing || false
          });
        } catch (e) {
          // If parsing fails, use defaults
          console.error('Error parsing saved cookie consent', e);
        }
      }
    }
  }, [isOpen]);
  
  // Log when modal opens
  useEffect(() => {
    if (isOpen) {
      console.log("Cookie settings modal opened");
    }
  }, [isOpen]);

  // Handle click on the overlay (outside the modal)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking directly on the overlay, not its children
    if (e.target === overlayRef.current) {
      onClose();
    }
  };
  
  // Handle toggle change for cookie categories
  const handleToggle = (category: keyof CookieSettings) => {
    // Don't allow toggling necessary cookies
    if (category === 'necessary') return;
    
    setSettings(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  // Handle save preferences
  const handleSave = () => {
    console.log("Saving preferences:", settings);
    onSave(settings);
  };
  
  // Handle accept all
  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    };
    console.log("Accepting all cookies:", allAccepted);
    onSave(allAccepted);
  };
  
  // Handle reject all (except necessary)
  const handleRejectAll = () => {
    const allRejected = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    };
    console.log("Rejecting all cookies:", allRejected);
    onSave(allRejected);
  };
  
  return (
    <ModalOverlay 
      $isOpen={isOpen} 
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <ModalContainer 
        $darkMode={darkMode}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
      >
        <ModalHeader $darkMode={darkMode}>
          <ModalTitle>Cookie Settings</ModalTitle>
          <CloseButton $darkMode={darkMode} onClick={onClose} aria-label="Close">×</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <ModalDescription>
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
            You can choose which categories of cookies you allow. Necessary cookies are always active as they
            are necessary for the website to function properly.
          </ModalDescription>
          
          <CookieTypes>
            {/* Necessary Cookies - Always enabled */}
            <CookieTypeItem $darkMode={darkMode}>
              <CookieTypeHeader>
                <CookieTypeName>Necessary Cookies</CookieTypeName>
                <ToggleLabel>
                  <ToggleInput 
                    type="checkbox" 
                    checked={settings.necessary} 
                    disabled={true} // Cannot be toggled
                  />
                  <ToggleSlider />
                </ToggleLabel>
              </CookieTypeHeader>
              <CookieTypeDescription>
                These cookies are necessary for the website to function properly and cannot be switched off.
                They are usually only set in response to actions made by you which amount to a request for services,
                such as setting your privacy preferences, logging in or filling in forms.
              </CookieTypeDescription>
              <CookieDetails>
                <DetailItem>
                  <DetailLabel>Legal Basis</DetailLabel>
                  <DetailValue>Art. 6 (1)(f) GDPR</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Storage Period</DetailLabel>
                  <DetailValue>Session - 1 Year</DetailValue>
                </DetailItem>
              </CookieDetails>
            </CookieTypeItem>
            
            {/* Functional Cookies */}
            <CookieTypeItem $darkMode={darkMode}>
              <CookieTypeHeader>
                <CookieTypeName>Functional Cookies</CookieTypeName>
                <ToggleLabel>
                  <ToggleInput 
                    type="checkbox" 
                    checked={settings.functional}
                    onChange={() => handleToggle('functional')}
                  />
                  <ToggleSlider />
                </ToggleLabel>
              </CookieTypeHeader>
              <CookieTypeDescription>
                These cookies enable the website to provide enhanced functionality and personalization.
                They may be set by us or by third party providers whose services we have added to our pages.
              </CookieTypeDescription>
              <CookieDetails>
                <DetailItem>
                  <DetailLabel>Legal Basis</DetailLabel>
                  <DetailValue>Art. 6 (1)(a) GDPR</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Storage Period</DetailLabel>
                  <DetailValue>1 Year</DetailValue>
                </DetailItem>
              </CookieDetails>
            </CookieTypeItem>
            
            {/* Analytics Cookies */}
            <CookieTypeItem $darkMode={darkMode}>
              <CookieTypeHeader>
                <CookieTypeName>Analytics Cookies</CookieTypeName>
                <ToggleLabel>
                  <ToggleInput 
                    type="checkbox" 
                    checked={settings.analytics}
                    onChange={() => handleToggle('analytics')}
                  />
                  <ToggleSlider />
                </ToggleLabel>
              </CookieTypeHeader>
              <CookieTypeDescription>
                These cookies allow us to count visits and traffic sources so we can measure and improve the
                performance of our site. They help us to know which pages are the most and least popular and
                see how visitors move around the site.
              </CookieTypeDescription>
              <CookieDetails>
                <DetailItem>
                  <DetailLabel>Legal Basis</DetailLabel>
                  <DetailValue>Art. 6 (1)(a) GDPR</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Recipients</DetailLabel>
                  <DetailValue>Google Analytics</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Storage Period</DetailLabel>
                  <DetailValue>2 Years</DetailValue>
                </DetailItem>
              </CookieDetails>
            </CookieTypeItem>
            
            {/* Marketing Cookies */}
            <CookieTypeItem $darkMode={darkMode}>
              <CookieTypeHeader>
                <CookieTypeName>Marketing Cookies</CookieTypeName>
                <ToggleLabel>
                  <ToggleInput 
                    type="checkbox" 
                    checked={settings.marketing}
                    onChange={() => handleToggle('marketing')}
                  />
                  <ToggleSlider />
                </ToggleLabel>
              </CookieTypeHeader>
              <CookieTypeDescription>
                These cookies may be set through our site by our advertising partners. They may be used by
                those companies to build a profile of your interests and show you relevant ads on other sites.
              </CookieTypeDescription>
              <CookieDetails>
                <DetailItem>
                  <DetailLabel>Legal Basis</DetailLabel>
                  <DetailValue>Art. 6 (1)(a) GDPR</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Recipients</DetailLabel>
                  <DetailValue>Facebook, Google</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Storage Period</DetailLabel>
                  <DetailValue>1 Year</DetailValue>
                </DetailItem>
              </CookieDetails>
            </CookieTypeItem>
          </CookieTypes>
        </ModalBody>
        
        <ModalFooter $darkMode={darkMode}>
          <Button $darkMode={darkMode} onClick={handleRejectAll}>
            Reject All
          </Button>
          
          <ButtonGroup>
            <Button $darkMode={darkMode} onClick={onClose}>
              Cancel
            </Button>
            <Button $darkMode={darkMode} onClick={handleSave}>
              Save Preferences
            </Button>
            <Button $darkMode={darkMode} $primary onClick={handleAcceptAll}>
              Accept All
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CookieSettingsModal;