import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useAuth } from './AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { theme } from '@src/theme';
import { config } from '@src/config';

// Animations
const fadeIn = css`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

const scanline = css`
  @keyframes scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
`;

const pulse = css`
  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 0.9; }
  }
`;

const shimmer = css`
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
`;

// Page wrapper — full screen, centred
const PageWrapper = styled('div')`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.bg};
  position: relative;
  overflow: hidden;

  /* grid background */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    background-image:
      linear-gradient(${theme.colors.border} 1px, transparent 1px),
      linear-gradient(90deg, ${theme.colors.border} 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
    pointer-events: none;
  }

  /* scan line */
  &::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    z-index: 1;
    background: linear-gradient(90deg, transparent, ${theme.colors.accent}40, transparent);
    animation: scanline 6s linear infinite;
    pointer-events: none;
  }

  @keyframes scanline {
    0%   { top: -2px; }
    100% { top: 100%; }
  }
`;

// Glow orbs behind the card
const GlowOrb = styled('div')`
  position: absolute;
  z-index: 0;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  animation: pulse 4s ease-in-out infinite;
  animation-delay: ${p => p.delay || '0s'};

  @keyframes pulse {
    0%, 100% { opacity: 0.25; }
    50%       { opacity: 0.55; }
  }
`;

const Card = styled('div')`
  position: relative;
  z-index: 2;
  width: 380px;
  padding: 36px 32px 32px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border2};
  border-radius: 10px;
  animation: fadeIn 0.45s ease both;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* top accent line */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${theme.colors.accent}, transparent);
    border-radius: 1px;
  }
`;

const Logo = styled('div')`
  font-family: ${theme.fonts.head};
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.text};
  text-align: center;
  margin-bottom: 4px;

  span {
    color: ${theme.colors.accent};
  }
`;

const Subtitle = styled('p')`
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  color: ${theme.colors.muted};
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 28px;
`;

const TabRow = styled('div')`
  display: flex;
  margin-bottom: 24px;
  border-bottom: 1px solid ${theme.colors.border};
`;

const Tab = styled('button')`
  flex: 1;
  background: none;
  border: none;
  padding: 10px 0;
  font-family: ${theme.fonts.head};
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  color: ${p => p.active ? theme.colors.accent : theme.colors.muted};
  border-bottom: 2px solid ${p => p.active ? theme.colors.accent : 'transparent'};
  margin-bottom: -1px;
  transition: color 0.2s, border-color 0.2s;

  &:hover {
    color: ${p => p.active ? theme.colors.accent : theme.colors.muted2};
  }
`;

const FieldGroup = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const Label = styled('label')`
  font-family: ${theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.muted};
  display: block;
  margin-bottom: 5px;
`;

const Input = styled('input')`
  width: 100%;
  background: ${theme.colors.surface2};
  border: 1px solid ${p => p.error ? '#f87171' : theme.colors.border2};
  border-radius: 6px;
  padding: 10px 12px;
  font-family: ${theme.fonts.head};
  font-size: 15px;
  color: ${theme.colors.text};
  outline: none;
  transition: border-color 0.2s, background 0.2s;

  &::placeholder {
    color: ${theme.colors.muted};
  }

  &:focus {
    border-color: ${p => p.error ? '#f87171' : theme.colors.accent};
    background: ${theme.colors.surface3};
  }
`;

const FieldError = styled('p')`
  font-family: ${theme.fonts.mono};
  font-size: 10px;
  color: #f87171;
  margin-top: 4px;
  letter-spacing: 0.04em;
`;

const PasswordRequirements = styled('ul')`
  list-style: none;
  margin: 6px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Requirement = styled('li')`
  font-family: ${theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.04em;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${p => p.met ? '#4ade80' : theme.colors.muted};
  transition: color 0.2s;
`;

const SubmitButton = styled('button')`
  width: 100%;
  padding: 12px;
  background: ${p => p.$loading ? theme.colors.surface3 : theme.colors.accent2};
  border: 1px solid ${p => p.$loading ? theme.colors.border2 : theme.colors.accent};
  border-radius: 6px;
  color: ${theme.colors.text};
  font-family: ${theme.fonts.head};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: ${p => p.$loading ? 'not-allowed' : 'pointer'};
  transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 0%, ${theme.colors.accent}30 50%, transparent 100%);
    background-size: 200% auto;
    animation: ${p => p.$loading ? 'shimmer 1.2s linear infinite' : 'none'};
  }

  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  &:hover:not(:disabled) {
    background: ${theme.colors.accent};
    box-shadow: 0 0 20px ${theme.colors.accent}50;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const GlobalError = styled('div')`
  background: #f8717115;
  border: 1px solid #f8717140;
  border-radius: 6px;
  padding: 10px 12px;
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  color: #f87171;
  margin-bottom: 16px;
  letter-spacing: 0.04em;
`;

const FooterText = styled('p')`
  text-align: center;
  font-family: ${theme.fonts.mono};
  font-size: 10px;
  color: ${theme.colors.muted};
  letter-spacing: 0.05em;
  margin-top: 20px;

  a {
    color: ${theme.colors.accent};
    text-decoration: none;
    cursor: pointer;

    &:hover { text-decoration: underline; }
  }
`;

export const Auth = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const loginRedirectTo = location.state?.from?.pathname || location.state?.fromPath || '/';
  const requestedMode = location.state?.mode;

  const [mode, setMode] = useState(requestedMode === 'register' ? 'register' : 'login');
  const [fields, setFields] = useState({ username: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => setFields(f => ({ ...f, [key]: e.target.value }));

  const decodeJwtPayload = (token) => {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    } catch {
      return null;
    }
  };

  const parseResponseBody = async (res) => {
    const text = await res.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  };

  const getErrorMessage = (body, fallback) => {
    if (!body) return fallback;
    if (typeof body === 'string') return body;
    if (body.error) return body.error;
    if (body.message) return body.message;

    const firstKey = Object.keys(body)[0];
    if (firstKey) {
      const val = body[firstKey];
      return typeof val === 'string' && val
        ? `${firstKey}: ${val}`
        : firstKey;
    }

    return fallback;
  };

  const passwordRules = [
    { label: 'No leading or trailing spaces', test: p => p === p.trim() },
    { label: 'At least 6 characters', test: p => p.length >= 6 },
    { label: 'One uppercase letter', test: p => /[A-Z]/.test(p) },
    { label: 'One number', test: p => /[0-9]/.test(p) },
    { label: 'One special character', test: p => /[^\w\s]/.test(p) },
  ];

  const passwordValid = (p) => passwordRules.every(r => r.test(p));

  const validate = () => {
    const errs = {};
    if (!fields.username) errs.username = 'Username is required';

    if (!fields.password) errs.password = 'Password is required';
    else if (mode === 'register' && !passwordValid(fields.password))
      errs.password = 'Password does not meet requirements';

    if (mode === 'register') {
      if (!fields.email) errs.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(fields.email)) errs.email = 'Invalid email address';
      if (!fields.confirm) errs.confirm = 'Please confirm your password';
      else if (fields.confirm !== fields.password) errs.confirm = 'Passwords do not match';
    }

    return errs;
  };

  const handleSubmit = async () => {
    setGlobalError('');
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    try {
      if (mode === 'register') {
        const signupRes = await fetch(`${config.api_url}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            username: fields.username,
            email: fields.email,
            password: fields.password,
          }),
        });

        if (!signupRes.ok) {
          const signupErr = await parseResponseBody(signupRes);
          throw new Error(`Signup failed (${signupRes.status}): ${getErrorMessage(signupErr, 'Unknown server error')}`);
        }
      }

      const loginRes = await fetch(`${config.api_url}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: fields.username,
          password: fields.password,
        }),
      });

      if (!loginRes.ok) {
        const loginErr = await parseResponseBody(loginRes);
        throw new Error(`Login failed (${loginRes.status}): ${getErrorMessage(loginErr, 'Unknown server error')}`);
      }

      const data = await parseResponseBody(loginRes);
      if (!data?.token) {
        throw new Error('Login succeeded but no token was returned');
      }
      const decoded = decodeJwtPayload(data.token);
      if (!decoded?.id) {
        throw new Error('Invalid token payload');
      }

      await login(data.token);
      const postAuthPath = mode === 'register' ? '/' : loginRedirectTo;
      navigate(postAuthPath, { replace: true });
    } catch (err) {
      setGlobalError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const switchMode = (m) => {
    setMode(m);
    setErrors({});
    setGlobalError('');
  };

  useEffect(() => {
    if (requestedMode === 'register' || requestedMode === 'login') {
      setMode(requestedMode);
      setErrors({});
      setGlobalError('');
    }
  }, [requestedMode]);

  return (
    <PageWrapper>
      <GlowOrb style={{ width: 300, height: 300, top: '15%', left: '20%', background: theme.colors.accent + '20' }} delay="0s" />
      <GlowOrb style={{ width: 200, height: 200, bottom: '20%', right: '22%', background: theme.colors.accent2 + '25' }} delay="2s" />

      <Card>
        <Logo>Match<span>Making</span></Logo>
        <Subtitle>Competitive Gaming Platform</Subtitle>

        <TabRow>
          <Tab active={mode === 'login'} onClick={() => switchMode('login')}>Login</Tab>
          <Tab active={mode === 'register'} onClick={() => switchMode('register')}>Register</Tab>
        </TabRow>

        {globalError && <GlobalError>⚠ {globalError}</GlobalError>}

        <FieldGroup onKeyDown={handleKeyDown}>
          <div>
            <Label>Username</Label>
            <Input
              type="text"
              placeholder="Your Username"
              value={fields.username}
              onChange={update('username')}
              error={!!errors.username}
            />
            {errors.username && <FieldError>{errors.username}</FieldError>}
          </div>

          {mode === 'register' && (
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={fields.email}
                onChange={update('email')}
                error={!!errors.email}
              />
              {errors.email && <FieldError>{errors.email}</FieldError>}
            </div>
          )}

          <div>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={fields.password}
              onChange={update('password')}
              error={!!errors.password}
              maxLength={64}
            />
            {errors.password && <FieldError>{errors.password}</FieldError>}
            {mode === 'register' && (
              <PasswordRequirements>
                {passwordRules.map(rule => (
                  <Requirement key={rule.label} met={rule.test(fields.password)}>
                    <span>{rule.test(fields.password) ? '✓' : '○'}</span>
                    {rule.label}
                  </Requirement>
                ))}
              </PasswordRequirements>
            )}
          </div>

          {mode === 'register' && (
            <div>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={fields.confirm}
                onChange={update('confirm')}
                error={!!errors.confirm}
              />
              {errors.confirm && <FieldError>{errors.confirm}</FieldError>}
              <PasswordRequirements>
                <Requirement met={fields.confirm.length > 0 && fields.confirm === fields.password}>
                  <span>{fields.confirm.length > 0 && fields.confirm === fields.password ? '✓' : '○'}</span>
                  Passwords match
                </Requirement>
              </PasswordRequirements>
            </div>
          )}
        </FieldGroup>

        <SubmitButton onClick={handleSubmit} $loading={loading} disabled={loading}>
          {loading ? 'Authenticating...' : mode === 'login' ? 'Login' : 'Create Account'}
        </SubmitButton>

        <FooterText>
          {mode === 'login'
            ? <>No account? <a onClick={() => switchMode('register')}>Create one</a></>
            : <>Already have an account? <a onClick={() => switchMode('login')}>Login</a></>
          }
        </FooterText>
      </Card>
    </PageWrapper>
  );
};