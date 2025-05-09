// src/components/pages/DatenschutzPage.tsx
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

// Datenschutz Page Component props interface
interface DatenschutzPageProps {
  darkMode: boolean;
  onBack: () => void;
}

// Datenschutz Page Component
const DatenschutzPage: React.FC<DatenschutzPageProps> = ({ darkMode, onBack }) => {
  return (
    <ViewportSection 
      id="datenschutz"
      darkMode={darkMode} 
      backgroundColor="rgba(58, 186, 170, 0.15)"
      title="Data Protection Notice (Datenschutzerklärung)"
    >
      <BackButton $darkMode={darkMode} onClick={onBack}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </BackButton>
      
      <ContentContainer $darkMode={darkMode}>
        <SectionTitle $darkMode={darkMode}>Data Protection Notice (Datenschutzerklärung)</SectionTitle>
        
        <SubTitle $darkMode={darkMode}>1. Controller / Verantwortlicher</SubTitle>
        <p><strong>Deutsch:</strong> Verantwortliche Stelle im Sinne der DSGVO ist<br />
        Andrew Julio<br />
        Invalidenstr. 104<br />
        10117 Berlin<br />
        E-Mail: datenschutz@andrewjulio.de<br />
        Telefon: +49 30 1234567</p>
        
        <p><strong>English:</strong> Controller under the GDPR is<br />
        Andrew Julio<br />
        Invalidenstr. 104<br />
        10117 Berlin<br />
        Email: privacy@andrewjulio.de<br />
        Phone: +49 30 1234567</p>
        
        <SubTitle $darkMode={darkMode}>2. Data Protection Officer / Datenschutzbeauftragter</SubTitle>
        <p><strong>Deutsch:</strong> Ein Datenschutzbeauftragter wird gemäß Art. 37 DSGVO nicht bestellt.</p>
        <p><strong>English:</strong> No data protection officer has been appointed under Art. 37 GDPR.</p>
        
        <SubTitle $darkMode={darkMode}>3. Collected Data & Purposes / Erhobene Daten & Verarbeitungszwecke</SubTitle>
        <p><strong>Deutsch:</strong><br />
        Webseitenbesuch: Server-Log-Files, IP-Adresse, Zeitpunkt, Dauer<br />
        Tracking & Cookies: Zwecke wie Analyse und Reichweitenmessung<br />
        Kontaktanfragen: Name, E-Mail, Inhalt der Nachricht</p>
        
        <p><strong>English:</strong><br />
        Website visits: server logs, IP address, timestamp, duration<br />
        Tracking & cookies: for analytics and reach measurement<br />
        Contact requests: name, email, message content</p>
        
        <SubTitle $darkMode={darkMode}>4. Legal Bases / Rechtsgrundlagen der Verarbeitung</SubTitle>
        <p><strong>Deutsch:</strong><br />
        Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse): z. B. Betrieb und Sicherung des Webangebots<br />
        Art. 6 Abs. 1 lit. a DSGVO (Einwilligung): z. B. Cookie-Einwilligung<br />
        Art. 6 Abs. 1 lit. b DSGVO (Vertrag): Anfragen im Rahmen vorvertraglicher Maßnahmen</p>
        
        <p><strong>English:</strong><br />
        Art. 6(1)(f) GDPR (legitimate interest): e.g. operation and security of the website<br />
        Art. 6(1)(a) GDPR (consent): e.g. cookie consent<br />
        Art. 6(1)(b) GDPR (contract): inquiries in the context of pre-contractual measures</p>
        
        <SubTitle $darkMode={darkMode}>5. Recipients / Empfänger</SubTitle>
        <p><strong>Deutsch:</strong> Personen und Stellen, die IT-Dienstleistungen erbringen (z. B. Hosting-Provider), sowie Auftragsverarbeiter.</p>
        <p><strong>English:</strong> IT service providers (e.g. hosting) and other processors.</p>
        
        <SubTitle $darkMode={darkMode}>6. International Transfers / Drittlandübermittlung</SubTitle>
        <p><strong>Deutsch:</strong> Datenübermittlung in Länder außerhalb der EU/des EWR erfolgt nicht.</p>
        <p><strong>English:</strong> No transfers outside the EU/EEA.</p>
        
        <SubTitle $darkMode={darkMode}>7. Retention Period / Speicherdauer</SubTitle>
        <p><strong>Deutsch:</strong> Daten werden gelöscht, sobald sie für den genannten Zweck nicht mehr benötigt werden, spätestens nach gesetzlichen Aufbewahrungsfristen (z. B. 6 Monate für Log-Files).</p>
        <p><strong>English:</strong> Data are erased once no longer needed, at the latest per statutory retention periods (e.g. 6 months for logs).</p>
        
        <SubTitle $darkMode={darkMode}>8. Data Subject Rights / Rechte der Betroffenen</SubTitle>
        <p><strong>Deutsch:</strong> Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch nach Art. 15–22 DSGVO sowie Beschwerde bei der Aufsichtsbehörde (Berliner Beauftragte für Datenschutz und Informationsfreiheit).</p>
        <p><strong>English:</strong> You have rights to access, rectify, erase, restrict processing, portability, and objection under Art. 15–22 GDPR, and to lodge a complaint with the Berlin Data Protection Authority.</p>
        
        <SubTitle $darkMode={darkMode}>9. Withdrawal & Complaints / Widerruf & Beschwerderecht</SubTitle>
        <p><strong>Deutsch:</strong> Ein Widerruf erteilter Einwilligungen und eine Beschwerde bei der Aufsichtsbehörde sind jederzeit möglich.</p>
        <p><strong>English:</strong> You may withdraw consents and lodge complaints with the supervisory authority at any time.</p>
        
        <p style={{ marginTop: '2rem', fontSize: '0.9rem', fontStyle: 'italic' }}>
          Hinweis: Dieses Dokument dient als Muster und erhebt keinen Anspruch auf Rechtsberatung. 
          Bei Unsicherheiten empfehlen wir Rücksprache mit einem Fachanwalt für IT-Recht.
        </p>
      </ContentContainer>
    </ViewportSection>
  );
};

export default DatenschutzPage;