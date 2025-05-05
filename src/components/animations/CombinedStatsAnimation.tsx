// src/components/animations/CombinedStatsAnimation.tsx
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

interface CombinedStatsAnimationProps {
  onComplete: () => void;
  darkMode: boolean;
  showWithJTLab?: boolean; // Flag to indicate if JT Lab is visible
}

// Helper component interfaces
interface CountUpValueProps {
  target: number;
  duration: number;
  prefix?: string;
  suffix?: string;
  accentColor?: boolean;
  darkMode?: boolean;
}

interface TypedTextProps {
  text: string;
  duration: number;
}

// Constants
const COLORS = {
  GLOW: 'rgba(132,227,215, 1.0)',
  GLOW_MEDIUM: 'rgba(132,227,215, 0.8)',
  GLOW_LIGHT: 'rgba(132,227,215, 0.6)',
  ACCENT: 'rgb(132,227,215)',
  TEXT_DARK: 'rgba(51, 51, 51, 0.9)',
  TEXT_LIGHT: 'rgba(255, 255, 255, 0.9)',
  TEXT_DARK_SECONDARY: 'rgba(51, 51, 51, 0.7)',
  TEXT_LIGHT_SECONDARY: 'rgba(255, 255, 255, 0.7)',
  DARK_BG: 'rgb(30, 31, 31)',
  LIGHT_BG: '#fff'
};

// Animation keyframes
const fadeInUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(30px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
  }
`;

// Styled components
const Container = styled.div<{ $darkMode: boolean; $showWithJTLab?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  color: ${props => props.$darkMode ? COLORS.TEXT_LIGHT : COLORS.TEXT_DARK};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: ${props => props.$showWithJTLab ? 10 : 100}; // Lower z-index when JT Lab is visible
  overflow: hidden;
  pointer-events: none; // Allow clicks to pass through to JT Lab if needed
`;

const StatsGrid = styled(motion.div)<{ $showWithJTLab?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 20px;
  width: 90%;
  max-width: 1000px;
  padding: 20px;
  margin-top: ${props => props.$showWithJTLab ? '40vh' : '0'}; // Push down when JT Lab is visible
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 1fr);
    margin-top: ${props => props.$showWithJTLab ? '45vh' : '0'};
  }
`;

const StatCard = styled(motion.div)<{ $darkMode: boolean; $delay: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  background-color: ${props => props.$darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 0.5s ease-out forwards;
  animation-delay: ${props => props.$delay}s;
  opacity: 0;
  text-align: center;
  backdrop-filter: blur(5px);
  overflow: hidden;
  pointer-events: auto; // Make cards clickable
  
  &:first-child {
    grid-column: 1 / span 2;
    
    @media (max-width: 768px) {
      grid-column: 1;
    }
  }
`;

const StatValue = styled.span<{ $accentColor?: boolean; $darkMode?: boolean }>`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: "Cal Sans", sans-serif;
  color: ${props => props.$accentColor ? COLORS.ACCENT : (props.$darkMode ? COLORS.TEXT_LIGHT : COLORS.TEXT_DARK)};
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StatDescription = styled.span<{ $darkMode?: boolean }>`
  font-size: 1.1rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: ${props => props.$darkMode ? COLORS.TEXT_LIGHT_SECONDARY : COLORS.TEXT_DARK_SECONDARY};
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Source = styled.div<{ $darkMode?: boolean }>`
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 0.7rem;
  opacity: 0.7;
  color: ${props => props.$darkMode ? COLORS.TEXT_LIGHT_SECONDARY : COLORS.TEXT_DARK_SECONDARY};
`;

const IconContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1.5rem;
  opacity: 0.5;
`;

const GrowingBar = styled.div<{ $darkMode: boolean; $progress: number }>`
  width: 100%;
  height: 10px;
  background-color: ${props => props.$darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 5px;
  overflow: hidden;
  margin-top: 0.5rem;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.$progress}%;
    background-color: ${COLORS.ACCENT};
    transition: width 0.8s ease-out;
  }
`;

const ProgressBar = styled.div<{ $progress: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: ${props => props.$progress}%;
  background-color: ${COLORS.ACCENT};
  transition: width 0.05s linear;
`;

const Flash = styled.div<{ $active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: ${props => props.$active ? 0.3 : 0};
  transition: opacity 0.1s ease-in-out;
  pointer-events: none;
`;

const SplitText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CountUpValue: React.FC<CountUpValueProps> = ({ 
  target, 
  duration, 
  prefix = '', 
  suffix = '', 
  accentColor = true, 
  darkMode = false 
}) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number | null = null;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    
    animationFrame = requestAnimationFrame(step);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration]);
  
  return (
    <StatValue $accentColor={accentColor} $darkMode={darkMode}>
      {prefix}{count}{suffix}
    </StatValue>
  );
};

const TypedText: React.FC<TypedTextProps> = ({ text, duration }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, index));
      index++;
      
      if (index > text.length) {
        clearInterval(interval);
      }
    }, duration / text.length);
    
    return () => clearInterval(interval);
  }, [text, duration]);
  
  return (
    <div style={{ minHeight: '2rem' }}>
      {displayedText}
    </div>
  );
};

// Main component
const CombinedStatsAnimation: React.FC<CombinedStatsAnimationProps> = ({ 
  onComplete, 
  darkMode, 
  showWithJTLab = false 
}) => {
  const [progress, setProgress] = useState(0);
  const [barProgress1, setBarProgress1] = useState(0);
  const [barProgress2, setBarProgress2] = useState(0);
  const [flashActive, setFlashActive] = useState(false);
  const [split, setSplit] = useState(false);

  useEffect(() => {
    // Start the animations
    setBarProgress1(50); // For 50% organic traffic
    
    // Revenue split animation
    setTimeout(() => {
      setSplit(true);
    }, 1500);
    
    // Flash animation for speed stat
    setTimeout(() => {
      setFlashActive(true);
    }, 1000);
    
    setTimeout(() => {
      setFlashActive(false);
    }, 1300);
    
    setTimeout(() => {
      setFlashActive(true);
    }, 1800);
    
    setTimeout(() => {
      setFlashActive(false);
    }, 2100);
    
    // Overall progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // If showing with JT Lab, wait 4.5 seconds total before completing
          // Otherwise complete after 3 seconds
          const completionDelay = showWithJTLab ? 1500 : 300;
          setTimeout(onComplete, completionDelay);
          return 100;
        }
        return prev + (100 / (3000 / 50)); // 3000ms total animation, update every 50ms
      });
    }, 50);
    
    // Simulated growing bar animation
    const barInterval = setInterval(() => {
      setBarProgress2(prev => Math.min(prev + 5, 100));
    }, 150);
    
    return () => {
      clearInterval(interval);
      clearInterval(barInterval);
    };
  }, [onComplete, showWithJTLab]);

  return (
    <Container $darkMode={darkMode} $showWithJTLab={showWithJTLab}>
      <StatsGrid
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        $showWithJTLab={showWithJTLab}
      >
        {/* Stat 1: 75% judge trust by design */}
        <StatCard $darkMode={darkMode} $delay={0}>
          <IconContainer>⚖️</IconContainer>
          <CountUpValue target={75} duration={1500} suffix='%' accentColor={true} darkMode={darkMode} />
          <StatDescription $darkMode={darkMode}>
            of website visitors judge trust based on design
          </StatDescription>
          <Source $darkMode={darkMode}>Source: Stanford Cred Project</Source>
        </StatCard>
        
        {/* Stat 2: 50% of traffic is organic */}
        <StatCard $darkMode={darkMode} $delay={0.1}>
          <IconContainer>🔍</IconContainer>
          <CountUpValue target={50} duration={1500} suffix='%' accentColor={true} darkMode={darkMode} />
          <StatDescription $darkMode={darkMode}>
            of all website traffic comes from organic search
          </StatDescription>
          <GrowingBar $darkMode={darkMode} $progress={barProgress1} />
          <Source $darkMode={darkMode}>Source: HubSpot</Source>
        </StatCard>
        
        {/* Stat 3: 2.6B lost to slow sites */}
        <StatCard $darkMode={darkMode} $delay={0.2}>
          <IconContainer>⏱️</IconContainer>
          {!split ? (
            <div>
              <StatValue $accentColor={true} $darkMode={darkMode}>$2.6B</StatValue>
              <StatDescription $darkMode={darkMode}>revenue lost annually to slow websites</StatDescription>
            </div>
          ) : (
            <SplitText>
              <StatValue $accentColor={true} $darkMode={darkMode} style={{ fontSize: '3rem' }}>$2.6B</StatValue>
              <StatDescription $darkMode={darkMode} style={{ fontSize: '0.9rem', marginTop: '-0.5rem' }}>
                lost revenue per year
              </StatDescription>
            </SplitText>
          )}
          <Source $darkMode={darkMode}>Source: DesignRush</Source>
        </StatCard>
        
        {/* Stat 4: 2.8× revenue growth */}
        <StatCard $darkMode={darkMode} $delay={0.15}>
          <IconContainer>📈</IconContainer>
          <StatValue $accentColor={true} $darkMode={darkMode}>
            <TypedText text="2.8× higher revenue growth" duration={1800} />
          </StatValue>
          <StatDescription $darkMode={darkMode}>
            for sites with excellent UX
          </StatDescription>
          <GrowingBar $darkMode={darkMode} $progress={barProgress2} />
          <Source $darkMode={darkMode}>Source: Deloitte/IJNRD</Source>
        </StatCard>
        
        {/* Stat 5: 43% invest in speed */}
        <StatCard $darkMode={darkMode} $delay={0.25}>
          <IconContainer>⚡</IconContainer>
          <Flash $active={flashActive} />
          <CountUpValue target={43} duration={1500} suffix='%' accentColor={true} darkMode={darkMode} />
          <StatDescription $darkMode={darkMode}>
            of successful companies invest in site speed
          </StatDescription>
          <Source $darkMode={darkMode}>Source: YouTube</Source>
        </StatCard>
      </StatsGrid>
      
      <ProgressBar $progress={progress} />
    </Container>
  );
};

export default CombinedStatsAnimation;