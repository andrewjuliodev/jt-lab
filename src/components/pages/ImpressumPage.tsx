// src/components/pages/ImpressumPage.tsx
import React from 'react';
import styled from 'styled-components';
import ViewportSection from '../ViewportSection';

// Constants
const COLORS = {
  GLOW: 'rgba(132,227,215, 1.0)',
  GLOW_MEDIUM: 'rgba(132,227,215, 0.8)',
  GLOW_LIGHT: 'rgba(132,227,215, 0.6)',
  DARK_TEXT: '#333',
  LIGHT_TEXT: '#fff',
  DARK_BG: 'rgb(30, 31, 31)',
  LIGHT_BG: '#fff',
  ACCENT_LIGHT: 'rgba(132,227,215, 0.2)',
  ACCENT_DARK: 'rgba(132,227,215, 0.1)'
};

interface ContentContainerProps {
  $darkMode: boolean;
}

const ContentContainer = styled.div<ContentContainerProps>`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background: ${props => props.$darkMode 
    ? 'rgba(0, 0, 0, 0.2)' 
    : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 15px;
  box-shadow: ${props => props.$darkMode 
    ? '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 15px rgba(132, 227, 215, 0.1)' 
    : '0 8px 32px rgba(0, 0, 0, 0.05), 0 0 15px rgba(132, 227, 215, 0.1)'};
  border-left: 4px solid rgba(132, 227, 215, 0.7);
  line-height: 1.5;
  overflow-y: auto;
  max-height: 80vh;
`;

interface SectionTitleProps {
  $darkMode: boolean;
}

const SectionTitle = styled.h2<SectionTitleProps>`
  color: ${props => props.$darkMode ? COLORS.GLOW_MEDIUM : COLORS.GLOW};
  margin-bottom: 1.5rem;
  font-family: "Cal Sans", sans-serif;
  text-align: center;
`;

interface SubTitleProps {
  $darkMode: boolean;
}

const SubTitle = styled.h3<SubTitleProps>`
  color: ${props => props.$darkMode ? COLORS.GLOW_LIGHT : COLORS.GLOW_MEDIUM};
  margin: 1.5rem 0 1rem;
  font-family: "Cal Sans", sans-serif;
`;

interface BackButtonProps {
  $darkMode: boolean;
}

const BackButton = styled.button<BackButtonProps>`
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px 15px;
  background-color: ${props => props.$darkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.$darkMode ? COLORS.LIGHT_TEXT : COLORS.DARK_TEXT};
  border: 1px solid ${props => props.$darkMode ? 'rgba(132, 227, 215, 0.3)' : 'rgba(132, 227, 215, 0.4)'};
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(132, 227, 215, 0.4);
    background-color: ${props => props.$darkMode ? 'rgba(132, 227, 215, 0.25)' : 'rgba(132, 227, 215, 0.35)'};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

// Impressum Page Component props interface
interface ImpressumPageProps {
  darkMode: boolean;
  onBack: () => void;
}

// Impressum Page Component
const ImpressumPage: React.FC<ImpressumPageProps> = ({ darkMode, onBack }) => {
  return (
    <ViewportSection 
      id="impressum"
      darkMode={darkMode} 
      backgroundColor="rgba(58, 186, 170, 0.15)"
      title="Legal Notice (Impressum)"
    >
      <BackButton $darkMode={darkMode} onClick={onBack}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </BackButton>
      
      <ContentContainer $darkMode={darkMode}>
        <SectionTitle $darkMode={darkMode}>Legal Notice (Impressum)</SectionTitle>
        
        <SubTitle $darkMode={darkMode}>1. Provider Identification / Anbieterkennzeichnung</SubTitle>
        <p><strong>Deutsch:</strong><br />
        Andrew Julio (Einzelunternehmer)<br />
        Invalidenstr. 104, 10117 Berlin</p>
        
        <p><strong>English:</strong><br />
        Andrew Julio (sole proprietor)<br />
        Invalidenstr. 104, 10117 Berlin</p>
        
        <SubTitle $darkMode={darkMode}>2. Contact / Kontakt</SubTitle>
        <p>Telefon: +49 30 1234567<br />
        E-Mail: kontakt@andrewjulio.de</p>
        
        <SubTitle $darkMode={darkMode}>3. Commercial Register / Registereintrag</SubTitle>
        <p>Nicht eingetragen (Einzelunternehmer).</p>
        
        <SubTitle $darkMode={darkMode}>4. VAT ID / Umsatzsteuer-Identifikationsnummer</SubTitle>
        <p>USt-ID gem. § 27 a UStG: DE 123456789</p>
        
        <SubTitle $darkMode={darkMode}>5. Supervisory Authority / Aufsichtsbehörde</SubTitle>
        <p>Berliner Beauftragte für Datenschutz und Informationsfreiheit<br />
        Alt-Moabit 98, 10559 Berlin</p>
        
        <SubTitle $darkMode={darkMode}>6. Content Responsibility / Verantwortlich für den Inhalt</SubTitle>
        <p>Andrew Julio, Invalidenstr. 104, 10117 Berlin</p>
        
        <SubTitle $darkMode={darkMode}>7. Accessibility / Zugänglichkeit</SubTitle>
        <p>Das Impressum ist von jeder Seite aus mit maximal zwei Klicks erreichbar.</p>
        
        <p style={{ marginTop: '2rem', fontSize: '0.9rem', fontStyle: 'italic' }}>
          Hinweis: Dieses Dokument dient als Muster und erhebt keinen Anspruch auf Rechtsberatung. 
          Bei Unsicherheiten empfehlen wir Rücksprache mit einem Fachanwalt für IT-Recht.
        </p>
      </ContentContainer>
    </ViewportSection>
  );
};

export default ImpressumPage;