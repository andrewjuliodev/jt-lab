// src/styles/GlobalStyle.ts
import { createGlobalStyle, keyframes } from 'styled-components';

// Keyframe animation for scrollbar opacity
const fadeInScrollbar = keyframes`
  from {
    scrollbar-color: transparent transparent;
  }
  to {
    scrollbar-color: rgba(132, 227, 215, 0.6) rgba(0, 0, 0, 0.1);
  }
`;

// Using Google Fonts for Cal Sans
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    
    @media (max-width: 1200px) {
      font-size: 15px;
    }
    
    @media (max-width: 992px) {
      font-size: 14px;
    }
    
    @media (max-width: 768px) {
      font-size: 13px;
    }
    
    @media (max-width: 480px) {
      font-size: 12px;
    }
  }

  body {
    font-family: "Cal Sans", sans-serif;
    background-color: #fff;
    overflow-x: hidden;
    min-height: 100vh;
    width: 100%;
    
    /* Hide scrollbar during intro animation */
    &.intro-active {
      overflow: hidden;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE and Edge */
      
      &::-webkit-scrollbar {
        width: 0;
        background: transparent;
      }
    }
    
    /* Show scrollbar after intro with animation */
    &.intro-complete {
      overflow-y: auto;
      scrollbar-width: thin; /* Firefox */
      animation: ${fadeInScrollbar} 1.5s ease-in-out forwards;
      
      /* For Webkit browsers */
      &::-webkit-scrollbar {
        width: 8px;
        transition: all 1.5s ease-in-out;
      }
      
      &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        transition: all 1.5s ease-in-out;
      }
      
      &::-webkit-scrollbar-thumb {
        background-color: rgba(132, 227, 215, 0.6);
        border-radius: 10px;
        transition: all 1.5s ease-in-out;
      }
      
      /* Hover effect for scrollbar */
      &::-webkit-scrollbar-thumb:hover {
        background-color: rgba(132, 227, 215, 0.8);
      }
    }
  }

  .cal-sans-regular {
    font-family: "Cal Sans", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  
  /* Add container styles for responsive layout */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    
    @media (max-width: 1200px) {
      max-width: 992px;
    }
    
    @media (max-width: 992px) {
      max-width: 768px;
    }
    
    @media (max-width: 768px) {
      max-width: 100%;
      padding: 0 1.5rem;
    }
  }
  
  /* Make images responsive */
  img {
    max-width: 100%;
    height: auto;
  }
  
  /* Make buttons touch-friendly */
  button {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* Improve form elements accessibility */
  input, textarea, select, button {
    font-family: inherit;
    font-size: inherit;
  }
  
  /* Remove focus outline only for mouse users, keep it for keyboard navigation */
  :focus:not(:focus-visible) {
    outline: none;
  }
  
  :focus-visible {
    outline: 2px solid #39e6d0;
    outline-offset: 2px;
  }
`;

export default GlobalStyle;