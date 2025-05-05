// src/components/sections/ServicesSection.tsx
import React from 'react';
import styled from 'styled-components';

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

// Types
interface ServicesSectionProps {
  id: string;
  darkMode: boolean;
}

// Styled Components
const SectionContainer = styled.section<{ $darkMode: boolean }>`
  min-height: 100vh;
  padding: 120px 20px 80px;
  background-color: ${props => props.$darkMode ? COLORS.DARK_BG : COLORS.LIGHT_BG};
  color: ${props => props.$darkMode ? COLORS.LIGHT_TEXT : COLORS.DARK_TEXT};
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const SectionTitle = styled.h2<{ $darkMode: boolean }>`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  font-family: "Cal Sans", sans-serif;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${COLORS.GLOW};
    box-shadow: 0 0 10px ${COLORS.GLOW_MEDIUM}, 0 0 20px ${COLORS.GLOW_LIGHT};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div<{ $darkMode: boolean }>`
  padding: 2rem;
  border-radius: 8px;
  background-color: ${props => props.$darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.9)'};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(5px);
  border: 1px solid ${props => props.$darkMode ? COLORS.ACCENT_DARK : COLORS.ACCENT_LIGHT};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(132, 227, 215, 0.15);
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${COLORS.GLOW_MEDIUM};
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ServiceFeatures = styled.ul`
  padding-left: 1.2rem;
  margin-top: 1rem;
`;

const ServiceFeature = styled.li`
  margin-bottom: 0.5rem;
`;

// Services data
const services = [
  {
    id: 1,
    title: "Custom Website Development",
    description: "Professional, responsive websites tailored to your specific business needs and brand identity.",
    features: [
      "Responsive design for all devices",
      "SEO-friendly structure",
      "Custom functionality",
      "Performance optimization"
    ]
  },
  {
    id: 2,
    title: "E-commerce Solutions",
    description: "Powerful online stores with secure payment gateways and intuitive product management systems.",
    features: [
      "Secure payment processing",
      "Inventory management",
      "Customer accounts",
      "Order tracking"
    ]
  },
  {
    id: 3,
    title: "Single Page Applications",
    description: "Fast, dynamic web applications with seamless user experiences and minimal page reloads.",
    features: [
      "React.js development",
      "State management",
      "API integration",
      "Interactive UIs"
    ]
  },
  {
    id: 4,
    title: "Progressive Web Apps",
    description: "Web applications that offer native app-like experiences with offline capabilities and high performance.",
    features: [
      "Offline functionality",
      "App-like experience",
      "Push notifications",
      "Home screen installation"
    ]
  },
  {
    id: 5,
    title: "Web Optimization",
    description: "Performance tuning to make your existing websites faster, more efficient, and mobile-friendly.",
    features: [
      "Page speed improvements",
      "Mobile responsiveness",
      "Code optimization",
      "Core Web Vitals tuning"
    ]
  },
  {
    id: 6,
    title: "UI/UX Design",
    description: "User-centered design that enhances usability and creates intuitive interfaces for your web projects.",
    features: [
      "User research",
      "Wireframing",
      "Prototyping",
      "User testing"
    ]
  }
];

// Component
const ServicesSection: React.FC<ServicesSectionProps> = ({ id, darkMode }) => {
  return (
    <SectionContainer id={id} $darkMode={darkMode}>
      <TitleContainer>
        <SectionTitle $darkMode={darkMode}>Services</SectionTitle>
      </TitleContainer>
      
      <ServicesGrid>
        {services.map(service => (
          <ServiceCard key={service.id} $darkMode={darkMode}>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
            <ServiceFeatures>
              {service.features.map((feature, index) => (
                <ServiceFeature key={index}>{feature}</ServiceFeature>
              ))}
            </ServiceFeatures>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </SectionContainer>
  );
};

export default ServicesSection;