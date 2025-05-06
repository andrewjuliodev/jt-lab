// src/components/ViewportSection.tsx
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

// Styled components
const SectionContainer = styled.section<{ 
  $darkMode: boolean; 
  $backgroundColor?: string;
  $height: string;
}>`
  height: ${props => props.$height};
  width: 100%;
  padding: 64px 20px 20px; /* Reduced padding to fit more content */
  background-color: ${props => props.$backgroundColor || 
    (props.$darkMode ? COLORS.DARK_BG : COLORS.LIGHT_BG)};
  color: ${props => props.$darkMode ? COLORS.LIGHT_TEXT : COLORS.DARK_TEXT};
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden; /* Prevent content from spilling out */
`;

const SectionTitle = styled.h2<{ $darkMode: boolean; $hidden?: boolean }>`
  font-size: 2.5rem; /* Reduced from 3.5rem */
  margin-bottom: 1.5rem; /* Reduced from 2rem */
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
  
  /* Add scrollable container for overflow content */
  overflow-y: ${props => props.$compact ? 'auto' : 'visible'};
  max-height: ${props => props.$compact ? 'calc(100vh - 150px)' : 'none'};
  
  /* Hide scrollbar but allow scrolling */
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
`;

/**
 * ViewportSection Component
 * A section component that fits within the viewport height, with scrollable content if needed.
 */
const ViewportSection: React.FC<ViewportSectionProps> = ({ 
  id, 
  darkMode, 
  backgroundColor,
  children, 
  hideHeader = false,
  title
}) => {
  const [viewportHeight, setViewportHeight] = useState('100vh');
  const [compact, setCompact] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Calculate viewport height and watch for resize
  useEffect(() => {
    const calculateHeight = () => {
      // Account for mobile browser address bars by using the inner window height
      const vh = `${window.innerHeight}px`;
      setViewportHeight(vh);
      
      // Check if content exceeds viewport and enable compact mode if needed
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const windowHeight = window.innerHeight;
        setCompact(contentHeight > windowHeight - 100); // 100px buffer for header
      }
    };
    
    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    
    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, [children]); // Recalculate when children change

  return (
    <SectionContainer
      id={id}
      $darkMode={darkMode}
      $backgroundColor={backgroundColor}
      $height={viewportHeight}
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