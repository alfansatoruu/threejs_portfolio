export const navLinks = [
  {
    id: 1,
    name: 'Home',
    href: '#home',
  },
  {
    id: 2,
    name: 'About',
    href: '#about',
  },
  {
    id: 3,
    name: 'Work',
    href: '#work',
  },
  {
    id: 4,
    name: 'Contact',
    href: '#contact',
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall ? [2, -3, 0] : isMobile ? [5, -3, 0] : isTablet ? [6, -5, 0] : [8, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 3, 0] : isMobile ? [5, 3, 0] : isTablet ? [5, 3, 0] : [8, 2.5, 0],
    ringPosition: isSmall ? [-6, 7, 0] : isMobile ? [-10, 13.5, 0] : isTablet ? [-12, 13, 0] : [-19, 10, 0],
    targetPosition: isSmall ? [-4, -11, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
  };
};