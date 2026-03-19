import styled from '@emotion/styled';
import { useNavigate, useLocation } from 'react-router-dom';
import { theme } from '@src/theme';
import { RiSettings5Line as SettingsIcon } from "react-icons/ri";
import { NotificationBell } from './NotificationBell';

const Nav = styled('nav')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 28px',
  height: '52px',
  background: theme.colors.surface,
  borderBottom: `1px solid ${theme.colors.border}`,
  fontFamily: theme.fonts.head,
});

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

const NavLinks = styled('div')({
  display: 'flex',
  gap: '20px',
});

const NavLink = styled('div')(({ active }) => ({
  fontSize: '12px',
  fontWeight: '600',
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  padding: '7px 14px',
  borderRadius: '4px',
  cursor: 'pointer',
  color: active ? theme.colors.accent : theme.colors.muted,
  background: active ? theme.colors.accentDim : 'transparent',
  '&:hover': {
    color: theme.colors.text,
    background: theme.colors.surface2,
  }
}));

const NavRight = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const Avatar = styled('div')({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accent2})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: '700',
  color: '#fff',
  border: `2px solid ${theme.colors.accent}`,
  cursor: 'pointer'
});

const Settings = styled('div')({
  width: '34px',
  height: '34px',
  borderRadius: '50%',
  background: 'transparent',
  border: `1px solid ${theme.colors.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.colors.muted,
  fontSize: '16px',
  transition: 'all .15s',
  cursor: 'pointer',
  '&:hover': {
    background: theme.colors.accentDim,
    border: `1px solid ${theme.colors.accent}`,
    color: theme.colors.accent,
  }
});

const links = [
  { label: 'Home', path: '/' },
  { label: 'Games', path: '/games' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Shop', path: '/shop' }
];

export const NavBar = ({ notifications }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const auth = true; // Change when Authing is added - Hard Code

  return (
    <Nav>
      <Logo onClick={() => navigate('/')}>
        {/* Change Name of Site - Hard Code*/}
        Match<span>Making</span>
      </Logo>
      <NavLinks>
        {links.map(({ label, path }) => (
          <NavLink
            key={path}
            active={pathname === path}
            onClick={() => navigate(path)}
          >
            {label}
          </NavLink>
        ))}
      </NavLinks>
      <NavRight>
        <NotificationBell data={notifications} />
        {auth ? (
          <Settings
            onClick={() => navigate('/settings')}
          >
            <SettingsIcon />
          </Settings>
        ) : null}
        <Avatar onClick={() => auth ? navigate('/profile') : navigate('/login')}>
          {/* Change Avatar Initials to Get from User - Hard Code*/}
          JD
        </Avatar>
      </NavRight>
    </Nav>
  )
}