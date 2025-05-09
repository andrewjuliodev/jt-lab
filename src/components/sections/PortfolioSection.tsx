// src/components/sections/PortfolioSection.tsx - Viewport optimized
import React from 'react';
import styled from 'styled-components';
import ViewportSection from '../ViewportSection';

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

// Styled components optimized for viewport fit
const SectionContent = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const IntroText = styled.p`
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.1rem;
  max-width: 800px;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
  margin: 1rem 0 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div<{ $darkMode: boolean; $bgImage: string }>`
  height: 180px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  background-image: ${props => `url(${props.$bgImage})`};
  background-size: cover;
  background-position: center;
  box-shadow: ${props => props.$darkMode 
    ? '0 8px 16px rgba(0, 0, 0, 0.3)' 
    : '0 8px 16px rgba(0, 0, 0, 0.1)'};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.$darkMode 
      ? '0 12px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(132, 227, 215, 0.2)' 
      : '0 12px 20px rgba(0, 0, 0, 0.15), 0 0 15px rgba(132, 227, 215, 0.2)'};
    
    .project-info {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    height: 160px;
  }
`;

const ProjectInfo = styled.div<{ $darkMode: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.$darkMode 
    ? 'rgba(0, 0, 0, 0.75)' 
    : 'rgba(255, 255, 255, 0.85)'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 1rem;
  text-align: center;
`;

const ProjectTitle = styled.h3<{ $darkMode: boolean }>`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.$darkMode ? COLORS.GLOW_MEDIUM : COLORS.GLOW};
`;

const ProjectType = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ViewButton = styled.button<{ $darkMode: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${props => props.$darkMode ? COLORS.GLOW_MEDIUM : COLORS.GLOW};
  color: ${props => props.$darkMode ? COLORS.DARK_BG : COLORS.LIGHT_TEXT};
  border: none;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(132, 227, 215, 0.3);
  }
`;

// Project data for sample display
const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    type: "Online Store",
    image: "https://via.placeholder.com/300x180/3abad8/ffffff?text=E-Commerce"
  },
  {
    id: 2,
    title: "Travel Booking System",
    type: "Web Application",
    image: "https://via.placeholder.com/300x180/38c6b0/ffffff?text=Travel+Booking"
  },
  {
    id: 3,
    title: "Corporate Website",
    type: "Brochure Site",
    image: "https://via.placeholder.com/300x180/36d7aa/ffffff?text=Corporate+Site"
  },
  {
    id: 4,
    title: "Artist Portfolio",
    type: "Showcase",
    image: "https://via.placeholder.com/300x180/34e8a5/ffffff?text=Artist+Portfolio"
  },
  {
    id: 5,
    title: "Fitness Membership",
    type: "Subscription Platform",
    image: "https://via.placeholder.com/300x180/32f9a0/ffffff?text=Fitness+App"
  },
  {
    id: 6,
    title: "Food Blog",
    type: "Content Platform",
    image: "https://via.placeholder.com/300x180/30dd98/ffffff?text=Food+Blog"
  }
];

// Button component for viewing all projects
const ViewAllButton = styled.button<{ $darkMode: boolean }>`
  padding: 0.7rem 1.5rem;
  background-color: transparent;
  color: ${props => props.$darkMode ? COLORS.LIGHT_TEXT : COLORS.DARK_TEXT};
  border: 2px solid ${COLORS.GLOW_MEDIUM};
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${COLORS.GLOW_MEDIUM};
    color: ${props => props.$darkMode ? COLORS.DARK_BG : COLORS.LIGHT_TEXT};
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(132, 227, 215, 0.4);
  }
`;

// Portfolio Section Component props interface
interface PortfolioSectionProps {
  id: string;
  darkMode: boolean;
  hideHeader?: boolean;
  onLegalNoticeClick?: () => void;
  onDataProtectionClick?: () => void;
  onDisclaimerClick?: () => void;
  onSectionClick?: (sectionId: string) => void; // Added prop
}

// Portfolio Section Component with Viewport optimization
const PortfolioSection: React.FC<PortfolioSectionProps> = ({ id, darkMode, hideHeader }) => {
  return (
    <ViewportSection 
      id={id} 
      darkMode={darkMode} 
      backgroundColor="rgba(58, 186, 170, 0.15)"
      hideHeader={hideHeader}
      title="Portfolio"
    >
      <SectionContent>
        <IntroText>
          Explore our collection of successful projects that showcase our expertise in web development.
          Each project demonstrates our commitment to quality, creativity, and client satisfaction.
        </IntroText>
        
        <ProjectsGrid>
          {projects.map(project => (
            <ProjectCard 
              key={project.id} 
              $darkMode={darkMode}
              $bgImage={project.image}
            >
              <ProjectInfo 
                className="project-info"
                $darkMode={darkMode}
              >
                <ProjectTitle $darkMode={darkMode}>{project.title}</ProjectTitle>
                <ProjectType>{project.type}</ProjectType>
                <ViewButton $darkMode={darkMode}>View Project</ViewButton>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </ProjectsGrid>
        
        <ViewAllButton $darkMode={darkMode}>
          View All Projects
        </ViewAllButton>
      </SectionContent>
    </ViewportSection>
  );
};

export default PortfolioSection;