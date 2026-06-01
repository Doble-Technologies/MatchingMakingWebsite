import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { theme } from '@src/theme';

const Wrapper = styled('div')({
  position: 'relative',
  cursor: 'pointer',
});

const Avatar = styled('div')({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  overflow: 'hidden',
  background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accent2})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: '700',
  color: '#fff',
  border: `2px solid ${theme.colors.accent}`
});

const AvatarImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
});

const Dropdown = styled('div')({
  position: 'absolute',
  top: 'calc(100% + 10px)',
  right: 0,
  width: '100px',
  background: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: '6px',
  overflow: 'hidden',
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column'
});

const Item = styled('div')({
  padding: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  '&:hover': {
    color: theme.colors.text,
    background: theme.colors.surface2,
  }
});

export const ProfileDropdown = ({ user, logout }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  console.log('user: ', user);
  const { avatar } = user;
  const initials = (user?.username || 'U').slice(0, 2).toUpperCase();

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, []);

  return (
    <Wrapper ref={dropdownRef}>
      <Avatar
        onClick={() => {
          return (
            setOpen(!open)
          );
        }}
      >
        {avatar ? (
          <AvatarImage src={avatar} alt={`${user?.username || 'User'} avatar`} />
        ) : initials}
      </Avatar>
      {open ? (
        <Dropdown>
          <Item
            onClick={() => navigate('/profile')}
          >
            Profile
          </Item>
          <Item
            onClick={() => {
              return logout();
            }}
          >
            Logout
          </Item>
        </Dropdown>
      ) : null}
    </Wrapper>
  );
}