// src/components/backgrounds/NeumorphicElements.tsx
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface NeumorphicElementsProps {
  darkMode: boolean;
  density?: 'low' | 'medium' | 'high';
  animated?: boolean;
}

// Types and configurations for neumorphic elements
interface ElementProps {
  $darkMode: boolean;
  $size: number;
  $x: number;
  $y: number;
  $animated?: boolean;
  $animationDelay?: number;
}

// Shared styles for neumorphic elements
const neumorphicStyles = css<{ $darkMode: boolean }>`
  position: absolute;
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  
  /* Light mode neumorphic styles */
  background-color: ${props => props.$darkMode ? '#222324' : '#f0f0f0'};
  box-shadow: ${props => props.$darkMode
    ? '5px 5px 10px #1a1b1c, -5px -5px 10px #2a2b2c'
    : '5px 5px 10px #c8c8c8, -5px -5px 10px #ffffff'};
`;

// Animation for floating elements
const floatAnimation = css<{ $animationDelay?: number }>`
  animation: float 6s ease-in-out infinite;
  animation-delay: ${props => props.$animationDelay || 0}s;
  
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

// Styled neumorphic circle element
const NeumorphicCircle = styled.div<ElementProps>`
  ${neumorphicStyles}
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  left: ${props => props.$x}%;
  top: ${props => props.$y}%;
  z-index: -7;
  ${props => props.$animated && floatAnimation}
  opacity: ${props => props.$darkMode ? 0.5 : 0.7};
`;

// Styled neumorphic square element with rounded corners
const NeumorphicSquare = styled.div<ElementProps>`
  ${neumorphicStyles}
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  left: ${props => props.$x}%;
  top: ${props => props.$y}%;
  border-radius: 15%;
  z-index: -7;
  ${props => props.$animated && floatAnimation}
  opacity: ${props => props.$darkMode ? 0.5 : 0.7};
  transform: rotate(15deg);
`;

// Component to render background neumorphic elements
const NeumorphicElements: React.FC<NeumorphicElementsProps> = ({ 
  darkMode, 
  density = 'medium',
  animated = true 
}) => {
  const [elements, setElements] = useState<React.ReactNode[]>([]);
  
  // Determine number of elements based on density
  const getElementCount = () => {
    switch (density) {
      case 'low': return 4;
      case 'high': return 12;
      case 'medium':
      default: return 8;
    }
  };
  
  // Generate random elements
  useEffect(() => {
    const count = getElementCount();
    const newElements: React.ReactNode[] = [];
    
    for (let i = 0; i < count; i++) {
      const size = Math.floor(Math.random() * 100) + 50; // Size between 50-150px
      const x = Math.floor(Math.random() * 90) + 5; // Position between 5-95%
      const y = Math.floor(Math.random() * 90) + 5;
      const animationDelay = Math.random() * 5; // Random delay between 0-5s
      
      // Alternate between circles and squares
      if (i % 2 === 0) {
        newElements.push(
          <NeumorphicCircle 
            key={`circle-${i}`}
            $darkMode={darkMode}
            $size={size}
            $x={x}
            $y={y}
            $animated={animated}
            $animationDelay={animationDelay}
          />
        );
      } else {
        newElements.push(
          <NeumorphicSquare 
            key={`square-${i}`}
            $darkMode={darkMode}
            $size={size}
            $x={x}
            $y={y}
            $animated={animated}
            $animationDelay={animationDelay}
          />
        );
      }
    }
    
    setElements(newElements);
  }, [darkMode, density, animated]);
  
  return <>{elements}</>;
};

export default NeumorphicElements;