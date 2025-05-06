// src/components/sections/PortfolioSection.tsx
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

// Section Container Styling
const SectionContainer = styled.section<{ $darkMode: boolean; $color: string }>`
  min-height: 100vh;
  padding: 120px 20px 80px;
  background-color: ${props => props.$darkMode ? 
    props.$color : 
    COLORS.LIGHT_BG};
  color: ${props => props.$darkMode ? COLORS.LIGHT_TEXT : COLORS.DARK_TEXT};
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
`;

const SectionTitle = styled.h2<{ $darkMode: boolean; $hidden?: boolean }>`
  font-size: 3.5rem;
  margin-bottom: 2rem;
  font-family: "Cal Sans", sans-serif;
  position: relative;
  display: ${props => props.$hidden ? 'none' : 'inline-block'};
`;

const SectionContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.2rem;
  line-height: 1.6;
`;

const PlaceholderText = styled.p`
  margin-bottom: 1.5rem;
`;

const DummyButton = styled.button<{ $darkMode: boolean }>`
  padding: 12px 24px;
  margin-top: 20px;
  background-color: ${props => props.$darkMode ? COLORS.GLOW_MEDIUM : COLORS.GLOW};
  color: ${props => props.$darkMode ? COLORS.DARK_BG : COLORS.LIGHT_TEXT};
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(132, 227, 215, 0.4);
  }
`;

// Section component interface
interface PortfolioSectionProps {
  id: string;
  darkMode: boolean;
  hideHeader?: boolean;
}

// Portfolio Section Component
const PortfolioSection: React.FC<PortfolioSectionProps> = ({ id, darkMode, hideHeader }) => {
  return (
    <SectionContainer id={id} $darkMode={darkMode} $color="rgba(58, 186, 170, 0.15)">
      {!hideHeader && (
        <SectionTitle $darkMode={darkMode}>Portfolio</SectionTitle>
      )}
      <SectionContent>
        <PlaceholderText>
          Explore our collection of successful projects that showcase our expertise in web development.
          Each project is a testament to our commitment to quality, creativity, and client satisfaction.
        </PlaceholderText>
        <PlaceholderText>
          From e-commerce stores to corporate websites, our portfolio demonstrates our ability to deliver
          exceptional digital experiences across various industries and business domains.
        </PlaceholderText>
        <DummyButton $darkMode={darkMode}>View More Projects</DummyButton>
      </SectionContent>
    </SectionContainer>
  );
};

export default PortfolioSection;