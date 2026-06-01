import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@src/Auth';
import { theme } from '@src/theme';

const Wrapper = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  background: theme.colors.bg,
});

const Card = styled('div')({
  width: '100%',
  maxWidth: '480px',
  background: theme.colors.surface,
  border: `1px solid ${theme.colors.border2}`,
  borderRadius: '10px',
  padding: '28px',
  textAlign: 'center',
});

const Title = styled('h1')({
  fontFamily: theme.fonts.head,
  fontSize: '26px',
  color: theme.colors.text,
  marginBottom: '10px',
});

const Message = styled('p')({
  fontFamily: theme.fonts.mono,
  fontSize: '12px',
  color: theme.colors.muted,
  lineHeight: 1.6,
  marginBottom: '18px',
});

const Action = styled('button')({
  borderRadius: '6px',
  border: `1px solid ${theme.colors.accent}`,
  background: theme.colors.accentDim,
  color: theme.colors.text,
  fontFamily: theme.fonts.head,
  fontWeight: 700,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  padding: '10px 14px',
  cursor: 'pointer',
});

export const AuthError = () => {
  const navigate = useNavigate();
  const { clearAuthError, logout } = useAuth();

  const handleRetry = () => {
    logout();
    clearAuthError();
    navigate('/auth', { replace: true, state: { mode: 'login' } });
  };

  return (
    <Wrapper>
      <Card>
        <Title>Error Authenticating</Title>
        <Message>
          We could not verify your account details right now. Please sign in again.
        </Message>
        <Action onClick={handleRetry}>Back To Login</Action>
      </Card>
    </Wrapper>
  );
};
