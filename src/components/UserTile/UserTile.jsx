import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@src/theme';
import { Layout } from '../Layout/Layout';
import { getTimeAgo } from '@src/utilities';
import { Button } from '@src/components/Common/Button';

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
            <p>{user?.display_name?.length > 20 ? user?.display_name.substring(0, 20) + '...' : user?.display_name}</p>
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