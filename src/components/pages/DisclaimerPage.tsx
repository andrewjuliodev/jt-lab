// src/components/pages/DisclaimerPage.tsx
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

// Disclaimer Page Component props interface
interface DisclaimerPageProps {
  darkMode: boolean;
  onBack: () => void;
}

// Disclaimer Page Component
const DisclaimerPage: React.FC<DisclaimerPageProps> = ({ darkMode, onBack }) => {
  return (
    <ViewportSection 
      id="disclaimer"
      darkMode={darkMode} 
      backgroundColor="rgba(58, 186, 170, 0.15)"
      title="Disclaimer / Haftungsausschluss"
    >
      <BackButton $darkMode={darkMode} onClick={onBack}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </BackButton>
      
      <ContentContainer $darkMode={darkMode}>
        <SectionTitle $darkMode={darkMode}>Disclaimer / Haftungsausschluss</SectionTitle>
        
        <SubTitle $darkMode={darkMode}>Zusammenfassung / Summary</SubTitle>
        <p>
          Im folgenden Muster-Disclaimer wird jegliche Haftung für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Informationen und Medien ausgeschlossen. Zudem wird jegliche Verantwortung für externe Links, Urheberrechtsverstöße sowie konkrete Leistungsbeschreibungen ausgeschlossen, um rechtliche Risiken bestmöglich zu minimieren.
        </p>
        
        <SubTitle $darkMode={darkMode}>Haftungsausschluss / Disclaimer</SubTitle>
        <p><strong>Deutsch:</strong> Die Inhalte dieser Webseite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr.</p>
        <p><strong>English:</strong> The content on this website has been created with the utmost care. However, we assume no liability for the accuracy, completeness, or timeliness of the content.</p>
        
        <SubTitle $darkMode={darkMode}>Externe Links / External Links</SubTitle>
        <p><strong>Deutsch:</strong> Diese Webseite enthält Verlinkungen zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist allein der jeweilige Anbieter verantwortlich.</p>
        <p><strong>English:</strong> This website contains links to external third-party websites over which we have no control. The respective providers are solely responsible for their content.</p>
        
        <SubTitle $darkMode={darkMode}>Urheberrecht / Copyright</SubTitle>
        <p><strong>Deutsch:</strong> Sämtliche auf dieser Webseite verwendeten Texte, Bilder, Grafiken und sonstige Medien unterliegen dem Urheberrecht. Inhalte Dritter sind als solche gekennzeichnet, und bei Bekanntwerden von Urheberrechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
        <p><strong>English:</strong> All texts, images, graphics, and other media used on this website are subject to copyright. Third-party content is identified as such, and upon notification of copyright infringement, we will remove the offending content without delay.</p>
        
        <SubTitle $darkMode={darkMode}>Leistungsbeschreibung / Description of Services</SubTitle>
        <p><strong>Deutsch:</strong> Alle Leistungen, Funktionen und dargestellten Beispiele dienen lediglich der Veranschaulichung und begründen keinerlei vertragliche Zusagen oder Garantien hinsichtlich Eignung oder Funktionalität.</p>
        <p><strong>English:</strong> All services, features, and examples shown are for illustrative purposes only and do not constitute any contractual commitments or guarantees of suitability or functionality.</p>
        
        <p style={{ marginTop: '2rem', fontSize: '0.9rem', fontStyle: 'italic' }}>
          Dieser Disclaimer ersetzt keine individuelle Rechtsberatung. Bei konkreten rechtlichen Fragen wird empfohlen, einen Fachanwalt für IT-Recht zu konsultieren.
        </p>
      </ContentContainer>
    </ViewportSection>
  );
};

export default DisclaimerPage;