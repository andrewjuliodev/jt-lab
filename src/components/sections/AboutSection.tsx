// Modified AboutSection.tsx with no empty space above
import React from 'react';
import styled from 'styled-components';

// Constants
const COLORS = {
  GLOW: 'rgba(132,227,215, 1.0)',
  GLOW_MEDIUM: 'rgba(132,227,215, 0.8)',
  DARK_TEXT: '#333',
  LIGHT_TEXT: '#fff',
  DARK_BG: 'rgb(30, 31, 31)',
  LIGHT_BG: '#fff',
  ACCENT_LIGHT: 'rgba(132,227,215, 0.2)',
  ACCENT_DARK: 'rgba(132,227,215, 0.1)'
};

// Section Container Styling - Modified to start immediately after header
const SectionContainer = styled.section<{ $darkMode: boolean; $color: string }>`
  /* Adjust padding to start right after header */
  padding: 60px 20px 40px;
  /* No min-height to avoid extra space */
  background-color: ${props => props.$darkMode ? 
    props.$color : 
    COLORS.LIGHT_BG};
  color: ${props => props.$darkMode ? COLORS.LIGHT_TEXT : COLORS.DARK_TEXT};
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  /* Ensure it starts at the top */
  margin-top: 0;
`;

const SectionTitle = styled.h2<{ $darkMode: boolean; $hidden?: boolean }>`
  font-size: 3.5rem;
  margin-bottom: 2rem;
  font-family: "Cal Sans", sans-serif;
  position: relative;
  display: ${props => props.$hidden ? 'none' : 'inline-block'};
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 40px;
  
  @media (max-width: 992px) {
    flex-direction: column-reverse;
    gap: 30px;
  }
`;

const BioImage = styled.div<{ $darkMode: boolean }>`
  position: relative;
  flex: 0 0 40%;
  
  img {
    max-width: 100%;
    border-radius: 15px;
    box-shadow: ${props => props.$darkMode 
      ? '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(132, 227, 215, 0.2)' 
      : '0 10px 30px rgba(0, 0, 0, 0.1), 0 0 15px rgba(132, 227, 215, 0.3)'};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    right: 15px;
    bottom: 15px;
    border-radius: 15px;
    background: rgba(132, 227, 215, 0.1);
    z-index: -1;
  }
  
  @media (max-width: 992px) {
    flex: 0 0 100%;
    max-width: 500px;
  }
`;

const BioParagraph = styled.div<{ $darkMode: boolean }>`
  flex: 0 0 55%;
  text-align: left;
  padding: 30px;
  background: ${props => props.$darkMode 
    ? 'rgba(0, 0, 0, 0.2)' 
    : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 15px;
  box-shadow: ${props => props.$darkMode 
    ? '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 15px rgba(132, 227, 215, 0.1)' 
    : '0 8px 32px rgba(0, 0, 0, 0.05), 0 0 15px rgba(132, 227, 215, 0.1)'};
  border-left: 4px solid rgba(132, 227, 215, 0.7);
  line-height: 1.7;
  
  p {
    margin-bottom: 1.2rem;
    font-size: 1.05rem;
  }
  
  @media (max-width: 992px) {
    flex: 0 0 100%;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 20px;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.button<{ $darkMode: boolean; $primary?: boolean }>`
  padding: 12px 24px;
  background-color: ${props => props.$primary 
    ? COLORS.GLOW_MEDIUM 
    : props.$darkMode ? 'rgba(132, 227, 215, 0.15)' : 'rgba(132, 227, 215, 0.25)'};
  color: ${props => props.$primary 
    ? (props.$darkMode ? COLORS.DARK_BG : COLORS.LIGHT_TEXT) 
    : (props.$darkMode ? COLORS.LIGHT_TEXT : COLORS.DARK_TEXT)};
  border: ${props => props.$primary 
    ? 'none' 
    : `1px solid ${props.$darkMode ? 'rgba(132, 227, 215, 0.3)' : 'rgba(132, 227, 215, 0.4)'}`};
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(132, 227, 215, 0.4);
    background-color: ${props => props.$primary 
      ? COLORS.GLOW 
      : props.$darkMode ? 'rgba(132, 227, 215, 0.25)' : 'rgba(132, 227, 215, 0.35)'};
  }
`;

// About Section Component props interface
interface AboutSectionProps {
  id: string;
  darkMode: boolean;
  hideHeader?: boolean;
}

// About Section Component
const AboutSection: React.FC<AboutSectionProps> = ({ id, darkMode, hideHeader }) => {
  return (
    <SectionContainer id={id} $darkMode={darkMode} $color="rgba(58, 186, 170, 0.35)">
      {!hideHeader && (
        <SectionTitle $darkMode={darkMode}>About Me</SectionTitle>
      )}
      
      <ContentContainer>
        <BioImage $darkMode={darkMode}>
          <img src="/ja_left.png" alt="Julio Tompsett" />
        </BioImage>
        
        <BioParagraph $darkMode={darkMode}>
          <p>
            My journey into web development began in 2017 with Python, while I was organizing global e-Crime congresses—an experience that instilled a deep understanding of digital trust and security. Since then, I've worked for industry leaders like Veracode and Pentera in cybersecurity, as well as RapidMiner in data science.
          </p>
          <p>
            I've also supported hundreds of aspiring professionals as a Mentor and Project Reviewer for Udacity's Data Analyst Nanodegree. Today, I build secure, reliable, and scalable cross-platform web apps with a strong focus on quality and user experience.
          </p>
          <p>
            Outside of work, I stay driven through personal data-driven projects and extreme triathlons like Patagonman, where discipline and endurance matter just as much as in tech.
          </p>
        </BioParagraph>
      </ContentContainer>
      
      <ButtonContainer>
        <Button $darkMode={darkMode} $primary>Download Resume</Button>
        <Button $darkMode={darkMode}>Contact Me</Button>
      </ButtonContainer>
    </SectionContainer>
  );
};

export default AboutSection;