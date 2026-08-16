import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from "@emotion/styled";
import { useAuth } from "@src/Auth";
import { config } from '@src/config';
import { transformXpToProgress } from "@src/utilities/maps";
import { DonutProgressBar } from "@src/components/DonutProgressBar";
import {
  FaAward,
  FaTrophy,
  FaEnvelope,
  FaCalendarAlt,
  FaGamepad,
  FaGlobeAmericas,
  FaStar,
  FaCircle,
} from 'react-icons/fa';

import { theme } from '@src/theme';

const PageContainer = styled("div")({
  maxWidth: 1300,
  padding: 32,
  margin: '0 auto'
});

const Banner = styled("div")({
  display: 'flex',
  alignItems: 'center',
  padding: 20,
  borderRadius: 18,
  overflow: 'hidden',
  background: theme.colors.surface,
  border: `2px solid ${theme.colors.border}`
});

const ProfileDetails = styled("div")({
  display: 'flex',
  alignItems: 'flex-end',
  gap: 24
});

const Avatar = styled("img")({
  width: 140,
  height: 140,
  borderRadius: '50%',
  objectFit: 'cover',
  border: `4px solid ${theme.colors.surface}`,
  background: theme.colors.surface
});

const UsernameProfileHeader = styled("div")({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  fontSize: theme.fontSize.heading,
  fontWeight: 700
});

const UserBio = styled("div")({
  marginTop: 8,
  color: theme.colors.muted2,
  fontSize: theme.fontSize.body
});

const ProfileBody = styled("div")({
  display: 'flex',
  gap: 24,
  marginTop: 24,
  alignItems: 'flex-start',
  '@media(max-width:900px)': {
    flexDirection: 'column'
  }
});

const Sidebar = styled("div")({
  width: 330,
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  '@media(max-width:900px)': {
    width: '100%'
  }
});

const ProfileContent = styled("div")({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 20
});

const Card = styled("div")({
  background: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: 16,
  padding: 22
});

const CardTitle = styled("div")({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  fontSize: 22,
  fontWeight: 700,
  paddingBottom: 10
});

const StatRow = styled("div")({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8,
  fontSize: theme.fontSize.label
});

const InfoRow = styled("div")({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginBottom: 14,
  color: theme.colors.muted2,
  fontSize: 16
});

const ChipCard = styled("div")({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12
});

const Chip = styled("div")({
  background: theme.colors.highlight,
  color: theme.colors.text,
  borderRadius: 999,
  padding: '10px 18px',
  border: `1px solid ${theme.colors.border}`,
  fontSize: 15
});

const AchievementCard = styled("div")({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))',
  gap: 16,
  padding: 10
});

const Achievement = styled("div")({
  background: theme.colors.surface2,
  borderRadius: 12,
  padding: 20,
  textAlign: 'center',
  border: `1px solid ${theme.colors.border}`,
  transition: '.2s',
  ':hover': {
    background: theme.colors.surface3,
    transform: 'translateY(-3px)'
  }
});

const AchievementTitle = styled("div")({
  marginTop: 12,
  color: theme.colors.muted2
});

export const Profile = () => {
  const { user } = useAuth();
  const { username: pathUsername } = useParams();

  const [profile, setProfile] = useState({
    username: '',
    avatar: '',
    levelInfo: {},
    bio: '',
    email: '',
    online: false,
    region: '',
    matchesPlayed: 0,
    winRate: 0,
    reputation: 0,
    favoriteGames: [],
    preferredRoles: [],
    createdAt: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userAchievements = [
    { id: 'veteran', title: 'Veteran', icon: FaTrophy, color: '#f4c542' },
    { id: '700', title: '700+ Matches', icon: FaGamepad, color: '#60a5fa' },
    { id: 'toprated', title: 'Top Rated', icon: FaStar, color: '#ff8b3d' },
    { id: 'teamplayer', title: 'Team Player', icon: FaTrophy, color: '#9bdb6d' }
  ];

  const userAccountInfo = [
    { id: 'email', title: profile?.email || 'E-Mail Not Found', icon: FaEnvelope },
    { id: 'createdAt', title: profile?.createdAt || 'Creation Date Not Found', icon: FaCalendarAlt },
    { id: 'reputation', title: `Reputation ${profile.reputation || 'Not Found'}`, icon: FaStar, color: '#FFD166' },
    { id: 'region', title: profile?.region || 'Region Not Found', icon: FaGlobeAmericas }
  ];

  const userStats = [
    { id: 'matches', title: 'Matches', value: profile.matchesPlayed },
    { id: 'winrate', title: 'Win Rate', value: `${profile.winRate}%` }
  ];

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${config.api_url}/user/profile/${pathUsername || user?.username}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      if (!data) {
        throw new Error('Invalid profile response');
      }
      setError(null);
      console.log(data);

      setProfile((prev) => ({
        ...prev,
        username: data.profile?.username ?? prev.username,
        avatar: data.profile?.avatar ?? prev.avatar,
        levelInfo: transformXpToProgress(data.profile?.xp) ?? transformXpToProgress(prev.xp),
        bio: data.profile?.bio ?? prev.bio,
        email: data.profile?.email ?? prev.email,
        online: data.profile?.online ?? prev.online,
        region: data.profile?.region ?? prev.region,
        matchesPlayed: data.profile?.matchesPlayed ?? prev.matchesPlayed,
        winRate: data.profile?.winRate ?? prev.winRate,
        reputation: data.profile?.reputation ?? prev.reputation,
        favoriteGames: data.profile?.favoriteGames ?? prev.favoriteGames,
        preferredRoles: data.profile?.preferredRoles ?? prev.preferredRoles,
        createdAt: data.profile?.created_at ?? prev.created_at
      }));
    } catch (err) {
      setError(err.message || 'Unable to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProfile();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <PageContainer>
        Loading profile...
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        Error: {error}
      </PageContainer>
    );
  }

  return (
      <PageContainer>
        <Banner>
          <ProfileDetails>
            <Avatar
              src={profile.avatar}
              alt={profile.username}
            />
            <div>
              <UsernameProfileHeader>
                {profile.username}
                {profile.online && (
                  <FaCircle css={{ color: theme.colors.online, fontSize: '1rem' }} />
                )}
              </UsernameProfileHeader>
              <UserBio>
                {profile.bio}
              </UserBio>
            </div>
          </ProfileDetails>
        </Banner>
        <ProfileBody>
          <Sidebar>
            <Card>
              <CardTitle>
                Player Stats
                <DonutProgressBar 
                  text={profile.levelInfo?.level || 0}
                  progress={profile.levelInfo?.progression || 0}
                  nextLevelAmount={profile.levelInfo?.nextLevelAmount || 100}
                />
              </CardTitle>
              {userStats?.map((i) => {
                return (
                  <StatRow key={i?.id}>
                    <span>{i?.title}</span>
                    <strong>{i?.value}</strong>
                  </StatRow>
                )
              })}
            </Card>
            <Card>
              <CardTitle>Account</CardTitle>
              {userAccountInfo?.map((i) => {
                const Icon = i?.icon;
                return (
                  <InfoRow key={i?.id}>
                    <Icon color={i?.color || theme.colors.accent} />
                    {i?.title}
                  </InfoRow>
                )
              })}
            </Card>
          </Sidebar>
          <ProfileContent>
            <Card>
              <CardTitle>Favorite Games</CardTitle>
              <ChipCard>
                {profile.favoriteGames.map(game => (
                  <Chip key={game}>
                    {game}
                  </Chip>
                ))}
              </ChipCard>
            </Card>
            <Card>
              <CardTitle>
                Preferred Roles
              </CardTitle>
              <ChipCard>
                {profile.preferredRoles.map(role => (
                  <Chip key={role}>
                    {role}
                  </Chip>
                ))}
              </ChipCard>
            </Card>
            <Card>
              <CardTitle>
                Achievements
              </CardTitle>
              <AchievementCard>
                {userAchievements?.map((i) => {
                  const Icon = i?.icon;
                  return (
                    <Achievement key={i?.id}>
                      <Icon size={42} color={i?.color} />
                      <AchievementTitle>
                        {i?.title}
                      </AchievementTitle>
                    </Achievement>
                  ) 
                })}
              </AchievementCard>
            </Card>
          </ProfileContent>
        </ProfileBody>
      </PageContainer>
  );
}