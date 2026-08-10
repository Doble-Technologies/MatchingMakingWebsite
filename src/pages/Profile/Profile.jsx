import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { config } from '@src/config';

import {
  FaTrophy,
  FaEnvelope,
  FaCalendarAlt,
  FaGamepad,
  FaGlobeAmericas,
  FaStar,
  FaCircle,
} from 'react-icons/fa';

import { theme } from '@src/theme';

const styles = {
  page: css({
    background: theme.colors.bg,
    color: theme.colors.text,
    minHeight: '100vh',
    padding: 32,
    fontFamily: theme.fonts.head,
  }),

  container: css({
    maxWidth: 1300,
    margin: '0 auto',
  }),

  banner: css({
    height: 240,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    background:
      'linear-gradient(135deg,#23466b 0%, #305f92 50%, #3b82f6 100%)',
    border: `1px solid ${theme.colors.border}`,
  }),

  bannerOverlay: css({
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(to top, rgba(0,0,0,.75), rgba(0,0,0,.15))',
  }),

  profileSection: css({
    position: 'absolute',
    bottom: 28,
    left: 32,
    display: 'flex',
    alignItems: 'flex-end',
    gap: 24,
  }),

  avatar: css({
    width: 140,
    height: 140,
    borderRadius: '50%',
    objectFit: 'cover',
    border: `4px solid ${theme.colors.surface}`,
    background: theme.colors.surface,
  }),

  username: css({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontSize: 36,
    fontWeight: 700,
  }),

  bio: css({
    marginTop: 8,
    color: theme.colors.muted2,
    fontSize: 17,
  }),

  online: css({
    color: '#3ddc84',
    fontSize: 12,
  }),

  body: css({
    display: 'flex',
    gap: 24,
    marginTop: 24,
    alignItems: 'flex-start',

    '@media(max-width:900px)': {
      flexDirection: 'column',
    },
  }),

  sidebar: css({
    width: 330,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,

    '@media(max-width:900px)': {
      width: '100%',
    },
  }),

  content: css({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  }),

  card: css({
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 16,
    padding: 22,
  }),

  cardTitle: css({
    fontSize: 22,
    marginBottom: 18,
    fontWeight: 700,
  }),

  statRow: css({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 14,
    fontSize: 17,
  }),

  infoRow: css({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
    color: theme.colors.muted2,
    fontSize: 16,
  }),

  chips: css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
  }),

  chip: css({
    background: theme.colors.highlight,
    color: theme.colors.text,
    borderRadius: 999,
    padding: '10px 18px',
    border: `1px solid ${theme.colors.border}`,
    fontSize: 15,
  }),

  achievements: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))',
    gap: 16,
  }),

  achievement: css({
    background: theme.colors.surface2,
    borderRadius: 12,
    padding: 20,
    textAlign: 'center',
    border: `1px solid ${theme.colors.border}`,
    transition: '.2s',

    ':hover': {
      background: theme.colors.surface3,
      transform: 'translateY(-3px)',
    },
  }),

  achievementTitle: css({
    marginTop: 12,
    color: theme.colors.muted2,
  }),
};

export const Profile = () => {
  const [profile, setProfile] = useState({
    username: '',
    avatar: '',
    xp: 0,
    level: 0,
    bio: '',
    email: '',
    online: false,
    region: '',
    matchesPlayed: 0,
    winRate: 0,
    reputation: 0,
    favoriteGames: [],
    preferredRoles: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${config.api_url}/user/profile/${'augustafrankie23'}`, {
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
        console.log(data);

        setProfile((prev) => ({
        ...prev,
        username: data.profile?.username ?? prev.username,
        avatar: data.profile?.avatar ?? prev.avatar,
        xp: data.profile?.xp ?? prev.xp,
        level: data.profile?.level ?? prev.level, // Calculate this
        bio: data.profile?.bio ?? prev.bio,
        email: data.profile?.email ?? prev.email,
        online: data.profile?.online ?? prev.online,
        region: data.profile?.region ?? prev.region,
        matchesPlayed: data.profile?.matchesPlayed ?? prev.matchesPlayed,
        winRate: data.profile?.winRate ?? prev.winRate,
        reputation: data.profile?.reputation ?? prev.reputation,
        favoriteGames: data.profile?.favoriteGames ?? prev.favoriteGames,
        preferredRoles: data.profile?.preferredRoles ?? prev.preferredRoles,
      }));
      } catch (err) {
        setError(err.message || 'Unable to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div css={styles.page}>
        <div css={styles.container}>Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div css={styles.page}>
        <div css={styles.container}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div css={styles.page}>
      <div css={styles.container}>
        <div css={styles.banner}>
          <div css={styles.bannerOverlay} />

          <div css={styles.profileSection}>
            <img
              css={styles.avatar}
              src={profile.avatar}
              alt={profile.username}
            />

            <div>
              <div css={styles.username}>
                {profile.username}

                {profile.online && (
                  <FaCircle css={styles.online} />
                )}
              </div>

              <div css={styles.bio}>
                {profile.bio}
              </div>
            </div>
          </div>
        </div>

        <div css={styles.body}>
          <aside css={styles.sidebar}>
            <div css={styles.card}>
              <div css={styles.cardTitle}>Player Stats</div>

              <div css={styles.statRow}>
                <span>Level</span>
                <strong>{profile.level}</strong>
              </div>

              <div css={styles.statRow}>
                <span>XP</span>
                <strong>{profile.xp.toLocaleString()}</strong>
              </div>

              <div css={styles.statRow}>
                <span>Matches</span>
                <strong>{profile.matchesPlayed}</strong>
              </div>

              <div css={styles.statRow}>
                <span>Win Rate</span>
                <strong>{profile.winRate}%</strong>
              </div>

              <div css={styles.statRow}>
                <span>Region</span>
                <strong>{profile.region}</strong>
              </div>
            </div>

            <div css={styles.card}>
              <div css={styles.cardTitle}>Account</div>

              <div css={styles.infoRow}>
                <FaEnvelope color={theme.colors.accent} />
                {profile.email}
              </div>

              <div css={styles.infoRow}>
                <FaCalendarAlt color={theme.colors.accent} />
                July 20, 2026
              </div>

              <div css={styles.infoRow}>
                <FaStar color="#FFD166" />
                Reputation {profile.reputation}
              </div>

              <div css={styles.infoRow}>
                <FaGlobeAmericas color={theme.colors.accent} />
                {profile.region}
              </div>
            </div>
          </aside>

          <main css={styles.content}>
            <div css={styles.card}>
              <div css={styles.cardTitle}>Favorite Games</div>

              <div css={styles.chips}>
                {profile.favoriteGames.map(game => (
                  <div css={styles.chip} key={game}>
                    {game}
                  </div>
                ))}
              </div>
            </div>

            <div css={styles.card}>
              <div css={styles.cardTitle}>
                Preferred Roles
              </div>

              <div css={styles.chips}>
                {profile.preferredRoles.map(role => (
                  <div css={styles.chip} key={role}>
                    {role}
                  </div>
                ))}
              </div>
            </div>

            <div css={styles.card}>
              <div css={styles.cardTitle}>
                Achievements
              </div>

              <div css={styles.achievements}>
                <div css={styles.achievement}>
                  <FaTrophy
                    size={42}
                    color="#f4c542"
                  />
                  <div css={styles.achievementTitle}>
                    Veteran
                  </div>
                </div>

                <div css={styles.achievement}>
                  <FaGamepad
                    size={42}
                    color="#60a5fa"
                  />
                  <div css={styles.achievementTitle}>
                    700+ Matches
                  </div>
                </div>

                <div css={styles.achievement}>
                  <FaStar
                    size={42}
                    color="#ff8b3d"
                  />
                  <div css={styles.achievementTitle}>
                    Top Rated
                  </div>
                </div>

                <div css={styles.achievement}>
                  <FaTrophy
                    size={42}
                    color="#9bdb6d"
                  />
                  <div css={styles.achievementTitle}>
                    Team Player
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}