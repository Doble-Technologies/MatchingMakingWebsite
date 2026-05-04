import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@src/theme';

const AnimatedLink = styled('a')({
  position: 'relative',
  display: 'inline-block',
  color: theme.colors.accent,
  textDecoration: 'none',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: '-2px',
    width: '100%',
    height: '2px',
    backgroundColor: theme.colors.accent,
    transform: 'scaleX(0)',
    transformOrigin: 'center center',
    transition: 'transform 180ms ease'
  },
  '&:hover::after': {
    transform: 'scaleX(1)'
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.colors.accent2}`,
    outlineOffset: '2px'
  },
  '&:focus-visible::after': {
    transform: 'scaleX(1)'
  }
});

export const Link = ({ 
  link,
  text = null,
  weight = null,
  size = null
}) => {
  return (
    <AnimatedLink
      href={link || '#'}
      style={{
        fontWeight: weight || null,
        fontSize: size || null
      }}
    >
      {text || 'Click Here'}
    </AnimatedLink>
  )
}