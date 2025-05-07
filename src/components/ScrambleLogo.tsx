// src/components/ScrambleLogo.tsx
import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Constants
const COLORS = {
  GLOW: 'rgba(132,227,215, 1.0)',
  GLOW_MEDIUM: 'rgba(132,227,215, 0.8)',
  GLOW_LIGHT: 'rgba(132,227,215, 0.6)',
  GLOW_LIGHTER: 'rgba(132,227,215, 0.4)',
  GLOW_LIGHTEST: 'rgba(132,227,215, 0.3)',
  GLOW_FAINT: 'rgba(132,227,215, 0.2)',
};

// Animation keyframes
const continuousGlowBurst = keyframes`
  0% {
    text-shadow:
      0 0 4px ${COLORS.GLOW_LIGHTEST},
      0 0 7px ${COLORS.GLOW_FAINT};
  }
  50% {
    text-shadow:
      0 0 8px ${COLORS.GLOW_MEDIUM},
      0 0 12px ${COLORS.GLOW_LIGHTER},
      0 0 16px ${COLORS.GLOW_LIGHTEST};
  }
  100% {
    text-shadow:
      0 0 4px ${COLORS.GLOW_LIGHTEST},
      0 0 7px ${COLORS.GLOW_FAINT};
  }
`;

const LogoContainer = styled.div<{ $darkMode: boolean }>`
  font-family: "Cal Sans", sans-serif;
  font-size: 1.8rem;
  font-weight: bold;
  color: ${props => props.$darkMode ? '#fff' : '#000'};
  cursor: pointer;
  animation: ${css`${continuousGlowBurst} 3s ease-in-out infinite`};
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  &:hover {
    text-shadow: 
      0 0 5px rgb(58, 186, 170),
      0 0 10px rgb(58, 186, 170),
      0 0 15px rgb(58, 186, 170);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

interface ScrambleLogoProps {
  darkMode: boolean;
  onClick?: () => void;
}

const ScrambleLogo: React.FC<ScrambleLogoProps> = ({ darkMode, onClick }) => {
  const [text, setText] = useState("JT Lab");
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const frameCountRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  // Characters to use for scrambling
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,./<>?';
  
  // Start and end texts
  const startText = "JT Lab";
  const endText = "JulioTompsett"; // Removed 's Lab
  
  // Animation duration in ms
  const duration = 200;
  
  useEffect(() => {
    if (isScrambling) {
      // Get the longer text to ensure all positions are filled
      const maxLength = Math.max(startText.length, endText.length);
      
      // Pad the texts to equal length
      const paddedStart = startText.padEnd(maxLength, ' ');
      const paddedEnd = endText.padEnd(maxLength, ' ');
      
      // Animation function
      const animate = (timestamp: number) => {
        // Initialize start time on first frame
        if (startTimeRef.current === null) {
          startTimeRef.current = timestamp;
        }
        
        // Calculate elapsed time
        const elapsed = timestamp - startTimeRef.current;
        
        // Calculate progress from 0 to 1
        const progress = Math.min(elapsed / duration, 1);
        
        // Only show the target text at the very end of the animation (> 95%)
        if (progress > 0.95 && isHovering) {
          setText(endText);
        } else {
          // Generate scrambled text during the animation
          let newText = '';
          
          for (let i = 0; i < maxLength; i++) {
            // If in the start text range and progress < 95%, either keep original or scramble
            if (i < paddedStart.length) {
              newText += Math.random() < 0.2 
                ? paddedStart[i] 
                : chars[Math.floor(Math.random() * chars.length)];
            } else {
              // Add random character for padding
              newText += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          
          setText(newText);
        }
        
        frameCountRef.current++;
        
        // Continue animation if not complete
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Make sure the final text is correct at the end
          setText(isHovering ? endText : startText);
          setIsScrambling(false);
          startTimeRef.current = null;
          frameCountRef.current = 0;
        }
      };
      
      // Start animation
      animationRef.current = requestAnimationFrame(animate);
      
      // Cleanup
      return () => {
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isScrambling, isHovering, startText, endText, chars, duration]);
  
  const handleMouseEnter = () => {
    setIsHovering(true);
    setIsScrambling(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsScrambling(true);
  };
  
  return (
    <LogoContainer
      $darkMode={darkMode}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      aria-label="Go to home section"
      tabIndex={0}
    >
      {text}
    </LogoContainer>
  );
};

export default ScrambleLogo;