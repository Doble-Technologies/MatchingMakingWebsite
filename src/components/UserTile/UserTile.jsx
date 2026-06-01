import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@src/theme';
import { Layout } from '../Layout/Layout';
import { getTimeAgo } from '@src/utilities';
import { Button } from '@src/components/Common/Button';

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

const UserCard = styled('div')({
  width: '100%',
  padding: '4px',
  border: `1px solid ${theme.colors.border}`,
  borderRadius: '6px',
  background: theme.colors.highlight
});

const CardHeader = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const CardTitle = styled('p')({
  fontWeight: '700',
});

const CardBody = styled('div')({});

export const UserTile = ({ user }) => {
  const initials = (user?.username || 'U').slice(0, 2).toUpperCase();
  const avatar = user?.avatar;
  return (
    <UserCard>
      <CardHeader>
        <Layout.Group space={4} alignItems='center'>
          <Avatar>
            {avatar ? (
              <AvatarImage src={avatar} alt={`${user?.username || 'User'} avatar`} />
            ) : initials}
          </Avatar>
          <Layout.Stack space={-10}>
            <p>{user?.username?.length > 20 ? user?.username.substring(0, 20) + '...' : user?.username}</p>
            <p 
              style={{
                fontSize: '10px',
                color: theme.colors.muted2,
                fontWeight: 500
              }}
            >
              Joined: {getTimeAgo(user?.created_at)}
            </p>
          </Layout.Stack>
        </Layout.Group>
        <Layout.Group space={8} alignItems='center'>
          <Button action={() => window.location.assign(`${window.location.protocol}//${window.location.host}/profile/${user?.user_id}`)}>
            View
          </Button>
        </Layout.Group>
      </CardHeader>
    </UserCard>
  );
}