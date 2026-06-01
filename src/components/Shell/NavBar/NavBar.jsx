import styled from '@emotion/styled';
import { theme } from '@src/theme';
import { useNavigate, useLocation } from 'react-router-dom';
import { RiSettings5Line as SettingsIcon } from "react-icons/ri";
import { NotificationBell } from './NotificationBell';
import { ProfileDropdown } from './ProfileDropdown';
import { useAuth } from '@src/Auth';

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

const Logo = styled('div')`
  font-family: ${theme.fonts.head};
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.text};
  text-align: center;
  span {
    color: ${theme.colors.accent};
  }
`;

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

const AuthAction = styled('button')(({ primary }) => ({
  borderRadius: '6px',
  border: `1px solid ${primary ? theme.colors.accent : theme.colors.border}`,
  background: primary ? theme.colors.accentDim : 'transparent',
  color: primary ? theme.colors.text : theme.colors.muted,
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '1.2px',
  textTransform: 'uppercase',
  padding: '8px 12px',
  cursor: 'pointer',
  transition: 'all .15s',
  '&:hover': {
    borderColor: theme.colors.accent,
    color: theme.colors.text,
    background: theme.colors.accentDim,
  },
}));

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
  const { user, loading, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAuthed = !!user;

  const handleLogout = () => {
    logout();
    navigate('/logged-out');
  };

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
        {isAuthed ? (
          <>
            <NotificationBell data={notifications} />
            <Settings
              onClick={() => navigate('/settings')}
            >
              <SettingsIcon />
            </Settings>
            <ProfileDropdown user={user} logout={handleLogout} />
          </>
        ) : (
          <>
            <AuthAction
              onClick={() => navigate('/auth', { state: { mode: 'login', fromPath: pathname } })}
              disabled={loading}
            >
              Login
            </AuthAction>
            <AuthAction
              onClick={() => navigate('/auth', { state: { mode: 'register' } })}
              disabled={loading}
            >
              Register
            </AuthAction>
          </>
        )}
      </NavRight>
    </Nav>
  )
}