import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@src/theme';
import { useNavigate, useLocation } from 'react-router-dom';
import { RiBarChart2Fill } from "react-icons/ri";

const Logo = styled('div')({
  fontSize: '24px',
  fontWeight: '700',
  letterSpacing: '3px',
  color: theme.colors.accent,
  cursor: 'pointer',
  'span': {
    color: theme.colors.text,
}
});

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
});

const LoginCard = styled('div')({
  position: 'relative',
  width: '25vw',
  height: '60vh',
  minWidth: '400px',
  minHeight: '500px',
  background: theme.colors.surface,
  borderStyle: 'solid',
  borderWidth: '4px 1px 1px 1px',
  borderColor: `${theme.colors.accent} ${theme.colors.border} ${theme.colors.border} ${theme.colors.border}`,
  borderRadius: '2%',
  overflow: 'hidden'
});

const CardContent = styled('div')({
  flex: 1
});

const CardFooter = styled('div')({
  position: 'absolute',
  bottom: 0,
  height: '10%',
  width: '100%',
  background: theme.colors.surfaceDeep,
  borderTop: `1px solid ${theme.colors.border}`
});

export const Login = () => {
  return (
    <Wrapper>
      <LoginCard>
        <CardContent>
          <RiBarChart2Fill />
        </CardContent>
        <CardFooter>

        </CardFooter>
      </LoginCard>
    </Wrapper>
  );
}