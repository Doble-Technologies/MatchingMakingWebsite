import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@src/theme';
import { getTimeAgo } from '@src/utilities';
import {
  RiNotification2Line as BellIcon,
  RiSwordLine as SwordIcon,
  RiTrophyLine as TrophyIcon,
  RiUserAddLine as FriendRequestIcon,
  RiUserFollowLine as FriendAddIcon,
  RiUserMinusLine as FriendRemoveIcon,
  RiUserForbidLine as FriendBlockIcon,
  RiShoppingBagLine as ShoppingBagIcon,
  RiMedalLine as AchievementIcon,
  RiInformationLine as InformationIcon
} from 'react-icons/ri';
import { FooterPagination } from './helpers';

const Wrapper = styled('div')({
  position: 'relative',
  cursor: 'pointer',
});

const Bell = styled('div')(({ unread }) => ({
  width: '34px',
  height: '34px',
  borderRadius: '50%',
  background: unread ? theme.colors.accentDim : 'transparent',
  border: `1px solid ${unread ? theme.colors.border : theme.colors.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: unread ? theme.colors.accent : theme.colors.muted,
  fontSize: '16px',
  transition: 'all .15s',
  '&:hover': {
    background: theme.colors.accentDim,
    border: `1px solid ${theme.colors.accent}`,
    color: theme.colors.accent,
  }
}));

const NotificationAlert = styled('div')({
  position: 'absolute',
  top: '-3px',
  right: '-3px',
  width: '15px',
  height: '15px',
  borderRadius: '50%',
  background: theme.colors.accent,
  border: `2px solid ${theme.colors.bg}`,
});

const Dropdown = styled('div')({
  position: 'absolute',
  top: 'calc(100% + 10px)',
  right: 0,
  width: '300px',
  background: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: '6px',
  overflow: 'hidden',
  zIndex: 100,
});

const DropdownHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6px 14px',
  borderBottom: `1px solid ${theme.colors.border}`,
  fontFamily: theme.fonts.head,
  fontSize: '12px',
  fontWeight: '700',
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  color: theme.colors.muted2,
});

const DropdownFooter = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 14px',
  borderBottom: `1px solid ${theme.colors.border}`,
  fontFamily: theme.fonts.head,
  fontSize: '12px',
  fontWeight: '700',
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  color: theme.colors.muted2,
});

const ReadAllNotificationsButton = styled('span')({
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

const Item = styled('div')(({ unread }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  padding: '12px 16px',
  borderBottom: `1px solid ${theme.colors.border}`,
  background: unread ? theme.colors.accentDim : 'transparent',
  transition: 'background .12s',
  cursor: 'pointer',
  '&:last-child': {
    borderBottom: 'none' 
  },
  '&:hover': {
    background: theme.colors.surface2
  },
}));

const ItemText = styled('div')({
  flex: 1,
});

const ItemTitle = styled('div')({
  fontSize: '13px',
  fontWeight: '600',
  color: theme.colors.text,
  fontFamily: theme.fonts.head,
  letterSpacing: '.3px',
});

const ItemTime = styled('div')({
  fontSize: '10px',
  color: theme.colors.muted,
  fontFamily: theme.fonts.mono,
  marginTop: '2px',
});

const UnreadDot = styled('div')({
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  background: theme.colors.accent,
  flexShrink: 0,
  marginTop: '5px',
});

const notificationIconMap = {
  bell: BellIcon,
  match: SwordIcon,
  rank_up: AchievementIcon,
  friend_request: FriendRequestIcon,
  friend_add: FriendAddIcon,
  friend_remove: FriendRemoveIcon,
  friend_block: FriendBlockIcon,
  shop: ShoppingBagIcon,
  won_game: TrophyIcon,
  default: InformationIcon,
};

export const NotificationBell = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(data);
  const notificationRef = useRef(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5
  });
  
  const currentNotifications = notifications?.slice(
    pagination?.pageIndex * pagination?.pageSize,
    (pagination?.pageIndex + 1) * pagination?.pageSize
  );

  const unreadCount = useMemo(() => {
    return notifications?.filter((n) => { return n?.unread })?.length;
  }, [notifications]);

  const markAllNotificationsRead = () => {
    setNotifications(
      notifications?.map((n) => {
        return { ...n, unread: false };
      })
    );
  };

  const markNotificationRead = (id) => {
    setNotifications(
      notifications?.map((n) => {
        return n?.id === id ? { ...n, unread: false } : n;
      })
    );
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setPagination((prev) => { return {...prev, pageIndex: 0 }});
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, []);

  return (
    <Wrapper ref={notificationRef}>
      <Bell
        unread={unreadCount > 0}
        onClick={() => {
          return (
            setPagination((prev) => { return {...prev, pageIndex: 0 }}),
            setOpen(!open)
          );
        }}
      >
        <BellIcon />
        {unreadCount > 0 ? (
          <NotificationAlert />
        ) : null}
      </Bell>
      {open ? (
        <Dropdown>
          <DropdownHeader>
            Notifications
            <ReadAllNotificationsButton
              onClick={() => {
                return markAllNotificationsRead();
              }}
            >
              Read All
            </ReadAllNotificationsButton>
          </DropdownHeader>
          {currentNotifications?.map((n) => {
            const Icon = notificationIconMap[n?.icon] || notificationIconMap.default;
            return (
              <Item
                key={n?.id}
                unread={n?.unread}
                onClick={() => {
                  return markNotificationRead(n?.id)
                }}
              >
                <Icon />
                <ItemText>
                  <ItemTitle>{n?.title}</ItemTitle>
                  <ItemTime>{getTimeAgo(n?.createdAt)}</ItemTime>
                </ItemText>
                {n?.unread ? (
                  <UnreadDot />
                ) : null}
              </Item>
            )
          })}
          <DropdownFooter>
            Total: {notifications?.length}
            <FooterPagination
              total={notifications?.length}
              pagination={pagination}
              setPagination={setPagination}
            />
          </DropdownFooter>
        </Dropdown>
      ) : null}
    </Wrapper>
  )
};