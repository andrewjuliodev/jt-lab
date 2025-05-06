// src/components/sections/ContactSection.tsx - Viewport optimized
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

// Styled components for viewport-optimized layout
const ContactContent = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  height: 100%;
  
  @media (max-width: 992px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const ContactInfo = styled.div`
  flex: 0 0 35%;
  display: flex;
  flex-direction: column;
  padding-right: 2rem;
  
  @media (max-width: 992px) {
    flex: 0 0 auto;
    padding-right: 0;
    text-align: center;
  }
`;

const FormContainer = styled.div`
  flex: 0 0 60%;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 992px) {
    flex: 0 0 auto;
  }
`;

const IntroText = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
`;

const ContactMethod = styled.div<{ $darkMode: boolean }>`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const IconContainer = styled.div<{ $darkMode: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 1rem;
  background-color: ${props => props.$darkMode ? 'rgba(132,227,215, 0.15)' : 'rgba(132,227,215, 0.2)'};
  color: ${props => props.$darkMode ? COLORS.GLOW_MEDIUM : COLORS.GLOW};
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactLabel = styled.span`
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
  opacity: 0.8;
`;

const ContactValue = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a<{ $darkMode: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.$darkMode ? 'rgba(132,227,215, 0.15)' : 'rgba(132,227,215, 0.2)'};
  color: ${props => props.$darkMode ? COLORS.GLOW_MEDIUM : COLORS.GLOW};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    background-color: ${COLORS.GLOW_MEDIUM};
    color: ${props => props.$darkMode ? COLORS.DARK_BG : COLORS.LIGHT_TEXT};
    box-shadow: 0 5px 15px rgba(132, 227, 215, 0.4);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const ContactForm = styled.div<{ $darkMode: boolean }>`
  padding: 1.5rem;
  border-radius: 10px;
  background: ${props => props.$darkMode 
    ? 'rgba(0, 0, 0, 0.2)' 
    : 'rgba(255, 255, 255, 0.8)'};
  box-shadow: ${props => props.$darkMode 
    ? '0 8px 32px rgba(0, 0, 0, 0.2)' 
    : '0 8px 32px rgba(0, 0, 0, 0.05)'};
  border: 1px solid ${props => props.$darkMode 
    ? 'rgba(132, 227, 215, 0.2)' 
    : 'rgba(132, 227, 215, 0.3)'};
`;

const FormTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1.2rem;
  font-family: "Cal Sans", sans-serif;
  text-align: center;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-size: 0.85rem;
  margin-bottom: 0.3rem;
  font-weight: 500;
`;

const FormInput = styled.input<{ $darkMode: boolean }>`
  padding: 0.6rem 0.8rem;
  border-radius: 5px;
  border: 1px solid ${props => props.$darkMode 
    ? 'rgba(132, 227, 215, 0.3)' 
    : 'rgba(132, 227, 215, 0.4)'};
  background-color: ${props => props.$darkMode 
    ? 'rgba(30, 31, 31, 0.8)' 
    : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.$darkMode ? COLORS.LIGHT_TEXT : COLORS.DARK_TEXT};
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: ${COLORS.GLOW_MEDIUM};
    box-shadow: 0 0 10px rgba(132, 227, 215, 0.3);
  }
`;

const FormTextarea = styled.textarea<{ $darkMode: boolean }>`
  padding: 0.8rem;
  border-radius: 5px;
  border: 1px solid ${props => props.$darkMode 
    ? 'rgba(132, 227, 215, 0.3)' 
    : 'rgba(132, 227, 215, 0.4)'};
  background-color: ${props => props.$darkMode 
    ? 'rgba(30, 31, 31, 0.8)' 
    : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.$darkMode ? COLORS.LIGHT_TEXT : COLORS.DARK_TEXT};
  font-size: 0.9rem;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${COLORS.GLOW_MEDIUM};
    box-shadow: 0 0 10px rgba(132, 227, 215, 0.3);
  }
`;

const SubmitButton = styled.button<{ $darkMode: boolean }>`
  padding: 0.8rem 1.5rem;
  margin-top: 0.5rem;
  background-color: ${props => props.$darkMode ? COLORS.GLOW_MEDIUM : COLORS.GLOW};
  color: ${props => props.$darkMode ? COLORS.DARK_BG : COLORS.LIGHT_TEXT};
  border: none;
  border-radius: 5px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  width: 100%;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(132, 227, 215, 0.4);
  }
`;

// Icons
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 14.001-7.496 14.001-13.996 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

// Section component interface
interface ContactSectionProps {
  id: string;
  darkMode: boolean;
  hideHeader?: boolean;
}

// Contact Section Component
const ContactSection: React.FC<ContactSectionProps> = ({ id, darkMode, hideHeader }) => {
  return (
    <ViewportSection 
      id={id} 
      darkMode={darkMode} 
      backgroundColor="rgba(58, 186, 170, 0.25)"
      hideHeader={hideHeader}
      title="Contact Us"
    >
      <ContactContent>
        <ContactInfo>
          <IntroText>
            Have a project in mind? We'd love to hear from you! Reach out using the contact information below or fill out the form.
          </IntroText>
          
          <ContactMethod $darkMode={darkMode}>
            <IconContainer $darkMode={darkMode}>
              <EmailIcon />
            </IconContainer>
            <ContactDetails>
              <ContactLabel>Email</ContactLabel>
              <ContactValue>hello@jtlab.dev</ContactValue>
            </ContactDetails>
          </ContactMethod>
          
          <ContactMethod $darkMode={darkMode}>
            <IconContainer $darkMode={darkMode}>
              <PhoneIcon />
            </IconContainer>
            <ContactDetails>
              <ContactLabel>Phone</ContactLabel>
              <ContactValue>+1 (555) 123-4567</ContactValue>
            </ContactDetails>
          </ContactMethod>
          
          <ContactMethod $darkMode={darkMode}>
            <IconContainer $darkMode={darkMode}>
              <LocationIcon />
            </IconContainer>
            <ContactDetails>
              <ContactLabel>Location</ContactLabel>
              <ContactValue>San Francisco, CA</ContactValue>
            </ContactDetails>
          </ContactMethod>
          
          <SocialLinks>
            <SocialIcon href="#" $darkMode={darkMode}>
              <TwitterIcon />
            </SocialIcon>
            <SocialIcon href="#" $darkMode={darkMode}>
              <LinkedInIcon />
            </SocialIcon>
            <SocialIcon href="#" $darkMode={darkMode}>
              <GitHubIcon />
            </SocialIcon>
          </SocialLinks>
        </ContactInfo>
        
        <FormContainer>
          <ContactForm $darkMode={darkMode}>
            <FormTitle>Send us a message</FormTitle>
            
            <FormRow>
              <FormGroup>
                <FormLabel>Name</FormLabel>
                <FormInput type="text" placeholder="Your name" $darkMode={darkMode} />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormInput type="email" placeholder="Your email" $darkMode={darkMode} />
              </FormGroup>
            </FormRow>
            
            <FormGroup style={{ marginBottom: '1rem' }}>
              <FormLabel>Subject</FormLabel>
              <FormInput type="text" placeholder="What's this about?" $darkMode={darkMode} />
            </FormGroup>
            
            <FormGroup style={{ marginBottom: '1rem' }}>
              <FormLabel>Message</FormLabel>
              <FormTextarea placeholder="Tell us about your project..." $darkMode={darkMode} />
            </FormGroup>
            
            <SubmitButton $darkMode={darkMode}>Send Message</SubmitButton>
          </ContactForm>
        </FormContainer>
      </ContactContent>
    </ViewportSection>
  );
};

export default ContactSection;