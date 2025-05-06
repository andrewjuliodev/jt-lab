// src/components/sections/ServicesSection.tsx - Updated with hideHeader prop
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
  hideHeader?: boolean;
}

interface ServiceProps {
  id: number;
  title: string;
  description: string;
  features: string[];
  isPrimary?: boolean;
  icon?: React.ReactNode;
}

// Styled Components
const SectionContainer = styled.section<{ $darkMode: boolean }>`
  min-height: 100vh;
  padding: 120px 20px 80px;
  background-color: ${props => props.$darkMode ? COLORS.DARK_BG : COLORS.LIGHT_BG};
  color: ${props => props.$darkMode ? COLORS.LIGHT_TEXT : COLORS.DARK_TEXT};
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  overflow: hidden;
`;

const SectionTitle = styled.h2<{ $darkMode: boolean; $hidden?: boolean }>`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2.5rem;
  font-family: "Cal Sans", sans-serif;
  position: relative;
  display: ${props => props.$hidden ? 'none' : 'inline-block'};
  
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

const TitleContainer = styled.div<{ $hidden?: boolean }>`
  display: ${props => props.$hidden ? 'none' : 'flex'};
  justify-content: center;
  width: 100%;
  margin-bottom: 3rem;
`;

const ServicesWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PrimaryServicesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const SecondaryServicesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SectionDivider = styled.div<{ $darkMode: boolean; $hidden?: boolean }>`
  position: relative;
  height: 2px;
  background: ${props => props.$darkMode 
    ? 'linear-gradient(to right, transparent, rgba(132,227,215, 0.8), transparent)' 
    : 'linear-gradient(to right, transparent, rgba(132,227,215, 0.5), transparent)'};
  margin: 1rem 0 3rem;
  display: ${props => props.$hidden ? 'none' : 'block'};
  
  &::before {
    content: 'Other Services';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${props => props.$darkMode ? COLORS.DARK_BG : COLORS.LIGHT_BG};
    padding: 0 20px;
    font-family: "Cal Sans", sans-serif;
    font-size: 1.2rem;
    color: ${props => props.$darkMode ? COLORS.GLOW_MEDIUM : COLORS.GLOW};
  }
`;

const ServiceCard = styled(motion.div)<{ $darkMode: boolean; $isPrimary?: boolean }>`
  padding: ${props => props.$isPrimary ? '2.5rem 2rem' : '2rem'};
  border-radius: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.$darkMode 
    ? props.$isPrimary 
      ? 'rgba(0, 0, 0, 0.4)'
      : 'rgba(0, 0, 0, 0.3)'
    : props.$isPrimary
      ? 'rgba(255, 255, 255, 0.95)'
      : 'rgba(255, 255, 255, 0.85)'};
  box-shadow: ${props => props.$darkMode
    ? props.$isPrimary
      ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 15px rgba(132, 227, 215, 0.1)'
      : '0 4px 20px rgba(0, 0, 0, 0.2)'
    : props.$isPrimary
      ? '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 15px rgba(132, 227, 215, 0.1)'
      : '0 4px 20px rgba(0, 0, 0, 0.05)'
  };
  backdrop-filter: blur(8px);
  border: 1px solid ${props => props.$darkMode 
    ? props.$isPrimary ? 'rgba(132, 227, 215, 0.2)' : 'rgba(132, 227, 215, 0.1)'
    : props.$isPrimary ? 'rgba(132, 227, 215, 0.3)' : 'rgba(132, 227, 215, 0.2)'};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, transparent, ${COLORS.GLOW}, transparent);
    opacity: ${props => props.$isPrimary ? 1 : 0.5};
  }
  
  &:hover {
    transform: ${props => props.$isPrimary ? 'translateY(-8px)' : 'translateY(-5px)'};
    box-shadow: ${props => props.$darkMode
      ? props.$isPrimary
        ? '0 15px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(132, 227, 215, 0.15)'
        : '0 8px 30px rgba(0, 0, 0, 0.25), 0 0 15px rgba(132, 227, 215, 0.1)'
      : props.$isPrimary
        ? '0 15px 40px rgba(0, 0, 0, 0.15), 0 0 25px rgba(132, 227, 215, 0.15)'
        : '0 8px 30px rgba(0, 0, 0, 0.1), 0 0 15px rgba(132, 227, 215, 0.1)'
    };
  }
`;

const IconContainer = styled.div<{ $darkMode: boolean }>`
  font-size: 2.5rem;
  color: ${COLORS.GLOW};
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  
  svg {
    filter: drop-shadow(0 0 8px ${props => props.$darkMode 
      ? 'rgba(132, 227, 215, 0.4)' 
      : 'rgba(132, 227, 215, 0.6)'});
  }
`;

const ServiceTitle = styled.h3<{ $isPrimary?: boolean }>`
  font-size: ${props => props.$isPrimary ? '1.8rem' : '1.4rem'};
  margin-bottom: 1rem;
  color: ${COLORS.GLOW_MEDIUM};
  font-family: "Cal Sans", sans-serif;
  text-align: center;
`;

const ServiceDescription = styled.p<{ $isPrimary?: boolean }>`
  font-size: ${props => props.$isPrimary ? '1.1rem' : '0.95rem'};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: center;
  flex-grow: 1;
`;

const ServiceFeatures = styled.ul<{ $isPrimary?: boolean }>`
  padding-left: 1.5rem;
  margin-top: 1rem;
  
  display: ${props => props.$isPrimary ? 'block' : 'none'};
  
  @media (max-width: 992px) {
    display: block;
  }
`;

const ServiceFeature = styled.li`
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

const LearnMoreButton = styled.button<{ $darkMode: boolean; $isPrimary?: boolean }>`
  background: ${props => props.$darkMode 
    ? 'rgba(132, 227, 215, 0.15)' 
    : 'rgba(132, 227, 215, 0.25)'};
  color: ${props => props.$darkMode ? COLORS.LIGHT_TEXT : COLORS.DARK_TEXT};
  border: 1px solid ${props => props.$darkMode 
    ? 'rgba(132, 227, 215, 0.3)' 
    : 'rgba(132, 227, 215, 0.4)'};
  padding: ${props => props.$isPrimary ? '0.8rem 1.5rem' : '0.6rem 1rem'};
  border-radius: 6px;
  font-size: ${props => props.$isPrimary ? '1rem' : '0.85rem'};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: auto;
  align-self: center;
  font-weight: 500;
  display: ${props => props.$isPrimary ? 'block' : 'none'};
  
  &:hover {
    background: ${COLORS.GLOW_MEDIUM};
    color: ${props => props.$darkMode ? COLORS.DARK_BG : COLORS.LIGHT_BG};
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(132, 227, 215, 0.3);
  }
  
  @media (max-width: 992px) {
    display: block;
  }
`;

// Icons for services
const EcommerceIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LandingPageIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BookingIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 14H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 14H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 14H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 18H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 18H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BlogIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 11H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 15H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PortfolioIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BrochureIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MembershipIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Primary Services data
const primaryServices: ServiceProps[] = [
  {
    id: 1,
    title: "E-commerce Solutions",
    description: "Custom online stores with secure payment gateways and intuitive product management systems.",
    features: [
      "Secure payment processing",
      "Inventory management",
      "Customer accounts",
      "Product showcasing",
      "Mobile-responsive design",
      "Sales analytics"
    ],
    isPrimary: true,
    icon: <EcommerceIcon />
  },
  {
    id: 2,
    title: "Landing Pages & Campaigns",
    description: "High-converting landing pages designed to capture leads and boost marketing campaign performance.",
    features: [
      "A/B testing ready",
      "Lead generation forms",
      "Analytics integration",
      "Fast loading speeds",
      "Campaign tracking",
      "SEO optimization"
    ],
    isPrimary: true,
    icon: <LandingPageIcon />
  },
  {
    id: 3,
    title: "Booking & Travel Sites",
    description: "Interactive booking platforms for hotels, tours, and travel services with real-time availability.",
    features: [
      "Real-time availability",
      "Secure booking system",
      "Payment processing",
      "User accounts",
      "Review & rating system",
      "Integrated maps"
    ],
    isPrimary: true,
    icon: <BookingIcon />
  }
];

// Secondary Services data
const secondaryServices: ServiceProps[] = [
  {
    id: 4,
    title: "Blogs & Content Platforms",
    description: "Customized blog platforms that showcase your content beautifully and engage your audience.",
    features: [
      "Content management system",
      "Comment functionality",
      "Social sharing",
      "Content categorization"
    ],
    icon: <BlogIcon />
  },
  {
    id: 5,
    title: "Portfolios & Personal Sites",
    description: "Stunning portfolio websites that showcase your work, skills, and achievements professionally.",
    features: [
      "Work showcasing",
      "Bio sections",
      "Contact forms",
      "Professional design"
    ],
    icon: <PortfolioIcon />
  },
  {
    id: 6,
    title: "Brochure Websites",
    description: "Clean, professional company websites that effectively communicate your brand and services.",
    features: [
      "Brand messaging",
      "Service showcasing",
      "Contact information",
      "About sections"
    ],
    icon: <BrochureIcon />
  },
  {
    id: 7,
    title: "Membership Platforms",
    description: "Subscription-based websites with gated content, member areas, and payment processing.",
    features: [
      "Member registration",
      "Subscription management",
      "Gated content access",
      "User dashboards"
    ],
    icon: <MembershipIcon />
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

// Component
const ServicesSection: React.FC<ServicesSectionProps> = ({ id, darkMode, hideHeader }) => {
  
  // Render a service card
  const renderServiceCard = (service: ServiceProps) => (
    <ServiceCard 
      key={service.id} 
      $darkMode={darkMode} 
      $isPrimary={service.isPrimary}
      variants={itemVariants}
      whileHover={{ scale: service.isPrimary ? 1.03 : 1.02 }}
    >
      {service.icon && (
        <IconContainer $darkMode={darkMode}>
          {service.icon}
        </IconContainer>
      )}
      <ServiceTitle $isPrimary={service.isPrimary}>{service.title}</ServiceTitle>
      <ServiceDescription $isPrimary={service.isPrimary}>{service.description}</ServiceDescription>
      <ServiceFeatures $isPrimary={service.isPrimary}>
        {service.features.map((feature, index) => (
          <ServiceFeature key={index}>{feature}</ServiceFeature>
        ))}
      </ServiceFeatures>
      <LearnMoreButton $darkMode={darkMode} $isPrimary={service.isPrimary}>
        Learn More
      </LearnMoreButton>
    </ServiceCard>
  );
  
  return (
    <SectionContainer id={id} $darkMode={darkMode}>
      <TitleContainer $hidden={hideHeader}>
        <SectionTitle $darkMode={darkMode} $hidden={hideHeader}>Services</SectionTitle>
      </TitleContainer>
      
      <ServicesWrapper>
        {/* Primary Services */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <PrimaryServicesContainer>
            {primaryServices.map(service => renderServiceCard(service))}
          </PrimaryServicesContainer>
        </motion.div>
        
        {/* Divider */}
        <SectionDivider $darkMode={darkMode} $hidden={hideHeader} />
        
        {/* Secondary Services */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <SecondaryServicesContainer>
            {secondaryServices.map(service => renderServiceCard(service))}
          </SecondaryServicesContainer>
        </motion.div>
      </ServicesWrapper>
    </SectionContainer>
  );
};

export default ServicesSection;