// src/components/sections/DummySections.tsx - Added hideHeader prop
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

// Section component interfaces
interface SectionProps {
  id: string;
  darkMode: boolean;
  hideHeader?: boolean;
}

// Portfolio Section Component
export const PortfolioSection: React.FC<SectionProps> = ({ id, darkMode, hideHeader }) => {
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

// Contact Section Component
export const ContactSection: React.FC<SectionProps> = ({ id, darkMode, hideHeader }) => {
  return (
    <SectionContainer id={id} $darkMode={darkMode} $color="rgba(58, 186, 170, 0.25)">
      {!hideHeader && (
        <SectionTitle $darkMode={darkMode}>Contact Us</SectionTitle>
      )}
      <SectionContent>
        <PlaceholderText>
          Have a project in mind? We'd love to hear from you! Reach out to us using the contact information
          below or fill out the form, and we'll get back to you as soon as possible.
        </PlaceholderText>
        <div style={{ 
          border: `1px solid ${darkMode ? COLORS.GLOW_MEDIUM : COLORS.GLOW}`,
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <h3 style={{ marginBottom: '15px' }}>Contact Form</h3>
          <div style={{ 
            width: '100%', 
            height: '250px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: darkMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)',
            borderRadius: '4px'
          }}>
            <p>Contact Form Placeholder</p>
          </div>
        </div>
        <DummyButton $darkMode={darkMode}>Send Message</DummyButton>
      </SectionContent>
    </SectionContainer>
  );
};

// About Section Component
export const AboutSection: React.FC<SectionProps> = ({ id, darkMode, hideHeader }) => {
  return (
    <SectionContainer id={id} $darkMode={darkMode} $color="rgba(58, 186, 170, 0.35)">
      {!hideHeader && (
        <SectionTitle $darkMode={darkMode}>About Me</SectionTitle>
      )}
      <SectionContent>
        <PlaceholderText>
          Hi, I'm Julio Tompsett, a passionate web developer with expertise in creating modern,
          responsive, and user-friendly websites. With several years of experience in the industry,
          I've developed a deep understanding of web technologies and design principles.
        </PlaceholderText>
        <PlaceholderText>
          My journey in web development began with a fascination for technology and a desire to create
          meaningful digital experiences. Today, I specialize in building custom websites that not only
          look great but also deliver exceptional performance and user experience.
        </PlaceholderText>
        <PlaceholderText>
          When I'm not coding, you can find me exploring new technologies, contributing to open-source
          projects, or sharing my knowledge with the web development community.
        </PlaceholderText>
        <DummyButton $darkMode={darkMode}>Download Resume</DummyButton>
      </SectionContent>
    </SectionContainer>
  );
};