// src/components/sections/HomeSection.tsx
import React from 'react';
import styled from 'styled-components';
import ViewportSection from '../ViewportSection';
import { motion } from 'framer-motion';

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

interface HomeSectionProps {
  id: string;
  darkMode: boolean;
  hideHeader?: boolean;
}

// Styled components
const HomeContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 0 20px;
  text-align: center;
`;

const MainHeading = styled(motion.h1)<{ $darkMode: boolean }>`
  font-size: 5rem;
  font-family: "Cal Sans", sans-serif;
  margin-bottom: 1.5rem;
  background: ${props => props.$darkMode
    ? 'linear-gradient(135deg, rgba(132,227,215, 1.0) 0%, rgba(58, 186, 170, 1.0) 100%)'
    : 'linear-gradient(135deg, rgba(58, 186, 170, 1.0) 0%, rgba(50, 150, 140, 1.0) 100%)'};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)<{ $darkMode: boolean }>`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  max-width: 800px;
  color: ${props => props.$darkMode ? COLORS.LIGHT_TEXT : COLORS.DARK_TEXT};
  opacity: 0.9;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CtaButtonsContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const PrimaryButton = styled.button<{ $darkMode: boolean }>`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, rgba(132,227,215, 1.0) 0%, rgba(58, 186, 170, 1.0) 100%);
  color: ${props => props.$darkMode ? COLORS.DARK_BG : COLORS.LIGHT_TEXT};
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(132, 227, 215, 0.5);
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }
`;

const SecondaryButton = styled.button<{ $darkMode: boolean }>`
  padding: 1rem 2rem;
  background: transparent;
  color: ${props => props.$darkMode ? COLORS.LIGHT_TEXT : COLORS.DARK_TEXT};
  border: 2px solid rgba(132,227,215, 0.8);
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(132,227,215, 0.1);
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(132, 227, 215, 0.3);
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }
`;

const BackgroundDecoration = styled.div<{ $darkMode: boolean; $position: string }>`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(132,227,215, 0.2) 0%, rgba(58, 186, 170, 0.1) 100%);
  filter: blur(50px);
  z-index: -1;
  
  ${props => {
    switch(props.$position) {
      case 'top-left':
        return `
          top: -50px;
          left: -50px;
        `;
      case 'top-right':
        return `
          top: -50px;
          right: -50px;
        `;
      case 'bottom-left':
        return `
          bottom: -50px;
          left: -50px;
        `;
      case 'bottom-right':
        return `
          bottom: -50px;
          right: -50px;
        `;
      default:
        return '';
    }
  }}
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

// Animation variants
const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const buttonsVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Home Section Component
const HomeSection: React.FC<HomeSectionProps> = ({ id, darkMode, hideHeader }) => {
  return (
    <ViewportSection
      id={id}
      darkMode={darkMode}
      backgroundColor={darkMode ? 'rgba(58, 186, 170, 0.05)' : 'rgba(58, 186, 170, 0.02)'}
      hideHeader={hideHeader}
      title="Home"
    >
      {/* Background decorations */}
      <BackgroundDecoration $darkMode={darkMode} $position="top-left" />
      <BackgroundDecoration $darkMode={darkMode} $position="bottom-right" />
      
      <HomeContentContainer>
        <MainHeading 
          $darkMode={darkMode}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Creating Digital Experiences That Matter
        </MainHeading>
        
        <Subtitle 
          $darkMode={darkMode}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          We build custom web solutions that combine cutting-edge technology with beautiful design to help your business thrive in the digital world.
        </Subtitle>
        
        <CtaButtonsContainer
          initial="hidden"
          animate="visible"
          variants={buttonsVariants}
        >
          <PrimaryButton $darkMode={darkMode} onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Services
          </PrimaryButton>
          
          <SecondaryButton $darkMode={darkMode} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Get in Touch
          </SecondaryButton>
        </CtaButtonsContainer>
      </HomeContentContainer>
    </ViewportSection>
  );
};

export default HomeSection;