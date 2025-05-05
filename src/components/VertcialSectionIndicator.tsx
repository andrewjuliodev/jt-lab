// src/components/VerticalSectionIndicator.tsx
import React from 'react';
import styled from 'styled-components';

interface VerticalSectionIndicatorProps {
  sections: string[];
  activeSection: string | null;
  darkMode: boolean;
  onSectionClick: (section: string) => void;
}

// Styled components for neumorphic vertical indicators
const IndicatorContainer = styled.div`
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 40px;
  z-index: 900;
  
  @media (max-width: 768px) {
    left: 10px;
    gap: 30px;
  }
`;

const VerticalText = styled.div<{ $active: boolean; $darkMode: boolean }>`
  writing-mode: vertical-lr;
  text-orientation: mixed;
  transform: rotate(180deg);
  font-family: "Cal Sans", sans-serif;
  font-size: 1.2rem;
  font-weight: ${props => props.$active ? '700' : '500'};
  letter-spacing: 2px;
  padding: 20px 10px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  color: ${props => props.$darkMode 
    ? (props.$active ? 'rgb(132,227,215)' : 'rgba(255, 255, 255, 0.6)') 
    : (props.$active ? 'rgb(58, 186, 170)' : 'rgba(0, 0, 0, 0.6)')};
  
  /* Neumorphic styles - light mode */
  background: ${props => props.$darkMode ? '#1e1f1f' : '#f0f0f0'};
  box-shadow: ${props => {
    if (props.$darkMode) {
      return props.$active
        ? 'inset 4px 4px 8px #141516, inset -4px -4px 8px #282a2a, 0 0 15px rgba(132, 227, 215, 0.3)'
        : '4px 4px 8px #151617, -4px -4px 8px #272929';
    } else {
      return props.$active
        ? 'inset 4px 4px 8px #c8c8c8, inset -4px -4px 8px #ffffff, 0 0 15px rgba(132, 227, 215, 0.3)'
        : '4px 4px 8px #d0d0d0, -4px -4px 8px #ffffff';
    }
  }};

  &:hover {
    color: ${props => props.$darkMode 
      ? 'rgb(132,227,215)' 
      : 'rgb(58, 186, 170)'};
    box-shadow: ${props => {
      if (props.$darkMode) {
        return props.$active
          ? 'inset 4px 4px 8px #141516, inset -4px -4px 8px #282a2a, 0 0 20px rgba(132, 227, 215, 0.4)'
          : '6px 6px 10px #151617, -6px -6px 10px #272929, 0 0 10px rgba(132, 227, 215, 0.2)';
      } else {
        return props.$active
          ? 'inset 4px 4px 8px #c8c8c8, inset -4px -4px 8px #ffffff, 0 0 20px rgba(132, 227, 215, 0.4)'
          : '6px 6px 10px #d0d0d0, -6px -6px 10px #ffffff, 0 0 10px rgba(132, 227, 215, 0.2)';
      }
    }};
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 15px 8px;
    border-radius: 12px;
  }
`;

const VerticalSectionIndicator: React.FC<VerticalSectionIndicatorProps> = ({
  sections,
  activeSection,
  darkMode,
  onSectionClick
}) => {
  const handleClick = (section: string) => {
    onSectionClick(section);
  };
  
  // Format section name to be title case
  const formatSectionName = (section: string) => {
    return section.charAt(0).toUpperCase() + section.slice(1);
  };

  return (
    <IndicatorContainer>
      {sections.map(section => (
        <VerticalText
          key={section}
          $active={activeSection === section}
          $darkMode={darkMode}
          onClick={() => handleClick(section)}
        >
          {formatSectionName(section)}
        </VerticalText>
      ))}
    </IndicatorContainer>
  );
};

export default VerticalSectionIndicator;