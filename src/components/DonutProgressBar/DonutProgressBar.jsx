import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@src/theme';

const Wrapper = styled('div')({
  position: 'relative',
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const ProgressRing = styled('svg')({
  position: 'absolute',
  inset: 0,
  transform: 'rotate(-90deg)'
});

const InnerText = styled('span')({
  position: 'relative',
  fontSize: '12px',
  fontWeight: '700',
  lineHeight: 1,
  color: theme.colors.text.primary
});

const ringRadius = 15;
const ringCircumference = 2 * Math.PI * ringRadius;

export const DonutProgressBar = ({ text, progress }) => {
  const ringOffset = ringCircumference - (progress / 100) * ringCircumference;
  return (
    <Wrapper>
      <ProgressRing viewBox="0 0 36 36" aria-hidden="true">
        <circle
          cx="18"
          cy="18"
          r={ringRadius}
          fill="none"
          stroke={theme.colors.border}
          strokeWidth="3"
        />
        <circle
          cx="18"
          cy="18"
          r={ringRadius}
          fill="none"
          stroke={theme.colors.accent}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={ringCircumference}
          strokeDashoffset={ringOffset}
        />
      </ProgressRing>
      <InnerText>{text}</InnerText>
    </Wrapper>
  );
}