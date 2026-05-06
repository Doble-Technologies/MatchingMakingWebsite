import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@src/theme';
import { Layout } from '../Layout/Layout';

const UserCard = styled("div")({
  width: "100%",
  padding: "4px",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "6px",
  background: theme.colors.highlight
});

const CardHeader = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const Button = styled('span')({
  border: `1px solid ${theme.colors.border}`,
  fontSize: '12px',
  fontWeight: '600',
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  padding: '4px 10px',
  borderRadius: '4px',
  cursor: 'pointer',
  color: theme.colors.muted2,
  '&:hover': {
    background: theme.colors.accentDim,
    borderColor: theme.colors.accent,
    color: theme.colors.accent,
    zIndex: 1,
  }
});

const CardTitle = styled("p")({
  fontWeight: "700",
});

const CardBody = styled("div")({});

export const UserTile = ({ user }) => {
  return (
    <UserCard>
      <CardHeader>
        <Layout.Group space={4} alignItems='center'>
          <p>AVATAR</p>
          <Layout.Stack space={-10}>
            <p>{user?.displayName?.length > 20 ? user?.displayName.substring(0, 20) + '...' : user?.displayName}</p>
            <p 
              style={{
                fontSize: '10px',
                color: theme.colors.muted2,
                fontWeight: 500
              }}
            >
              Joined: {user?.doj}
            </p>
          </Layout.Stack>
        </Layout.Group>
        <Layout.Group space={8} alignItems='center'>
          <Layout.Stack>
            <p>New Test</p>
            <p>Special Test</p>
          </Layout.Stack>
          <Button>
            View
          </Button>
        </Layout.Group>
      </CardHeader>
    </UserCard>
  );
}