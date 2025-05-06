// src/components/ViewportSection.tsx - Updated for horizontal scrolling
import React, { useEffect, useState, useRef } from 'react';
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

// ViewportSection props interface
interface ViewportSectionProps {
  id: string;
  darkMode: boolean;
  backgroundColor?: string;
  children: React.ReactNode;
  hideHeader?: boolean;
  title?: string;
}

// Styled components - adjusted for horizontal scrolling
const SectionContainer = styled.section<{ 
  $darkMode: boolean; 
  $backgroundColor?: string;
}>`
  width: 100vw; /* Full viewport width for horizontal layout */
  height: 100vh; /* Full viewport height */
  padding: 64px 20px 20px;
  background-color: ${props => props.$backgroundColor || 
    (props.$darkMode ? COLORS.DARK_BG : COLORS.LIGHT_BG)};
  color: ${props => props.$darkMode ? COLORS.LIGHT_TEXT : COLORS.DARK_TEXT};
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-sizing: border-box; /* Include padding in the total dimensions */
  flex-shrink: 0; /* Prevent section from shrinking */
`;

const SectionTitle = styled.h2<{ $darkMode: boolean; $hidden?: boolean }>`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-family: "Cal Sans", sans-serif;
  position: relative;
  display: ${props => props.$hidden ? 'none' : 'inline-block'};
`;

const ContentContainer = styled.div<{ $compact?: boolean }>`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: ${props => props.$compact ? 'auto' : 'visible'};
  
  /* Create proper scrolling for content if needed */
  & > * {
    max-height: calc(100vh - 150px);
    overflow-y: auto;
    scrollbar-width: thin;
    
    &::-webkit-scrollbar {
      width: 4px;
    }
    
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: rgba(132, 227, 215, 0.3);
      border-radius: 10px;
      border: 2px solid transparent;
    }
  }
`;

/**
 * ViewportSection Component - Modified for horizontal scrolling
 * A section component that fits within the viewport width and height.
 */
const ViewportSection: React.FC<ViewportSectionProps> = ({ 
  id, 
  darkMode, 
  backgroundColor,
  children, 
  hideHeader = false,
  title
}) => {
  const [compact, setCompact] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Check if content exceeds viewport and enable compact mode if needed
  useEffect(() => {
    const calculateHeight = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const windowHeight = window.innerHeight;
        setCompact(contentHeight > windowHeight - 120); // 120px buffer for header + padding
      }
    };
    
    calculateHeight();
    
    // Recalculate on resize and theme change
    window.addEventListener('resize', calculateHeight);
    
    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, [children, darkMode]);
  
  return (
    <SectionContainer
      id={id}
      $darkMode={darkMode}
      $backgroundColor={backgroundColor}
      aria-label={title || id}
    >
      {!hideHeader && title && (
        <SectionTitle $darkMode={darkMode}>{title}</SectionTitle>
      )}
      
      <ContentContainer ref={contentRef} $compact={compact}>
        {children}
      </ContentContainer>
    </SectionContainer>
  );
};

export default ViewportSection;