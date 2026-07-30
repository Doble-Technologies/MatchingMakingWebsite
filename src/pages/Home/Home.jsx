import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@src/Auth";
import { useNews } from "@src/hooks/useNews";
import { theme } from "@src/theme";
import { DonutProgressBar } from "@src/components/DonutProgressBar";
import { gamesMap, transformXpToProgress } from "@src/utilities/maps";
import { Link } from "@src/components/Link";
import { UserTile } from "@src/components/UserTile";
import { Button } from "@src/components/Common/Button";
import { config } from '@src/config';

const PageContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "24% 50% 24%",
  padding: "10px",
  gap: "1%",
});

const ColumnWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const CardTemplate = styled("div")({
  width: "100%",
  padding: "4px",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "6px",
});

const PanelCard = styled(CardTemplate)({
  padding: 0,
  background: theme.colors.surface,
  borderColor: theme.colors.border2,
  overflow: "hidden",
});

const PanelHeader = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  background: theme.colors.surface2,
});

const PanelBody = styled("div")({
  padding: "10px",
  background: theme.colors.surface,
});

const FullWidthDivider = styled("div")({
  borderBottom: `1px solid ${theme.colors.border}`,
  margin: 0,
});

const PanelTitle = styled("p")({
  fontWeight: "700",
  margin: 0,
  fontFamily: theme.fonts.mono,
  fontSize: "12px",
  letterSpacing: "1.2px",
  wordSpacing: "-4px",
  textTransform: "uppercase",
  color: theme.colors.muted2,
});

const EmptyState = styled("div")({
  textAlign: "center",
  paddingTop: "16px",
  paddingBottom: "16px",
  color: theme.colors.muted2
});

const PatchNotesHeader = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
});

const PatchNotesTitleWrap = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "10px",
});

const PatchNotesAccent = styled("div")({
  width: "3px",
  height: "24px",
  borderRadius: "2px",
  background: theme.colors.accent,
});

const PatchNotesTitle = styled("p")({
  margin: 0,
  fontSize: "34px",
  lineHeight: "1",
  fontWeight: 700,
  fontFamily: theme.fonts.head,
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: theme.colors.muted2,
});

const PatchNotesList = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

const PatchNotesFeaturedCard = styled("article")({
  position: "relative",
  overflow: "hidden",
  border: `1px solid ${theme.colors.border2}`,
  borderRadius: "6px",
  background: theme.colors.surface,
  transition: "border-color .15s ease",
  "&:hover": {
    borderColor: theme.colors.accent,
    cursor: "pointer"
  },
});

const PatchNotesGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "12px",
  "@media (max-width: 1100px)": {
    gridTemplateColumns: "1fr",
  },
});

const PatchNotesMiniCard = styled("article")({
  position: "relative",
  overflow: "hidden",
  border: `1px solid ${theme.colors.border2}`,
  borderRadius: "6px",
  background: theme.colors.surface,
  transition: "border-color .15s ease",
  "&:hover": {
    borderColor: theme.colors.accent,
    cursor: "pointer"
  },
});

const PatchNotesBadge = styled("div")({
  position: "absolute",
  top: "12px",
  left: "12px",
  zIndex: 2,
  padding: "6px 10px",
  borderRadius: "4px",
  background: theme.colors.accent,
  color: theme.colors.surface,
  fontFamily: theme.fonts.mono,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "1px",
  textTransform: "uppercase",
});

const PatchNotesImage = styled("img")({
  display: "block",
  width: "100%",
  objectFit: "cover",
  objectPosition: "50% 0%",
});

const PatchNotesHeroImage = styled(PatchNotesImage)({
  height: "260px",
});

const PatchNotesMiniImage = styled(PatchNotesImage)({
  height: "150px",
});

const PatchNotesContent = styled("div")(({ featured }) => ({
  padding: featured ? "16px 18px 18px" : "12px 14px 14px",
}));

const PatchNotesMetaRow = styled("div")({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "12px",
  marginBottom: "8px",
});

const PatchNotesTitleText = styled("p")(({ featured }) => ({
  margin: 0,
  fontWeight: 700,
  fontSize: featured ? "22px" : "16px",
  lineHeight: "1.2",
  color: theme.colors.muted2,
}));

const PatchNotesCategory = styled("span")({
  display: "inline-flex",
  alignItems: "center",
  padding: "4px 8px",
  borderRadius: "4px",
  background: theme.colors.accent,
  color: theme.colors.surface,
  fontFamily: theme.fonts.mono,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.8px",
  textTransform: "uppercase",
});

const PatchNotesDateText = styled("p")({
  margin: 0,
  flexShrink: 0,
  whiteSpace: "nowrap",
  fontSize: "12px",
  color: theme.colors.muted2,
  opacity: 0.8,
});

const PatchNotesDescription = styled("p")(({ featured }) => ({
  margin: featured ? "12px 0 0" : "8px 0 0",
  color: theme.colors.muted2,
  opacity: 0.9,
  lineHeight: "1.5",
  fontSize: featured ? "16px" : "13px",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: featured ? 3 : 2,
  overflow: "hidden",
}));

const tempUser = {
  displayName: 'Carnage',
  level: 1,
  progression: 60,
  friendsList: []
};

const gameInfo = [
  { csgo: { rank: 'L6' } },
  { mch: { rank: 'L1' } }
];

const formatNewsDate = (item, getNewsTimestamp) => {
  const timestamp = getNewsTimestamp(item);
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const isNewsFromLastWeek = (item) => {
  const publishedAt = new Date(item?.publishedAt).getTime();
  if (Number.isNaN(publishedAt)) return false;

  const ageInMs = Date.now() - publishedAt;
  const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
  return ageInMs >= 0 && ageInMs <= oneWeekInMs;
};

export const Home = () => {
  const [recentUser, setRecentUser] = useState({});
  const navigate = useNavigate();
  const { user } = useAuth();
  const { news, getNewsTimestamp } = useNews();
  const logged = !!user;
  const { level, progression, nextLevelAmount } = transformXpToProgress(user?.xp);

  const goToPatchNote = (item) => {
    navigate(`/patchnote/${item?.newsId}`);
  };

  useEffect(() => {
    const init = async () => {
      const getRecentUser = async () => {
        return fetch(`${config.api_url}/view/latest/users`)
          .then(response => response.json())
          .catch(error => console.error('Error fetching data:', error));
      };
      const users = await getRecentUser();
      const user = users?.users?.[0] || {};
      setRecentUser({
        ...user,
        created_at: new Date(user.created_at).getTime()
      });
    };
    init();
  }, []);

  return (
    <PageContainer>
      <ColumnWrapper>
        {logged ? (
          <React.Fragment>
          <PanelCard>
            <PanelHeader>
                <PanelTitle>Current Rank & Levels</PanelTitle>
                <DonutProgressBar 
                  text={level || 0}
                  progress={progression || 0}
                  nextLevelAmount={nextLevelAmount || 100}
                /> 
              </PanelHeader>
              <FullWidthDivider />
              <PanelBody>
                {gameInfo?.length > 0 ? (
                  gameInfo?.map((item, idx) => {
                    const currentGame = Object.keys(item)[0];
                    const game = gamesMap[currentGame];
                    const rank = item[currentGame]?.rank;
                    return (
                      <p key={`${game}-${idx}`}>
                        {game} - {rank}
                      </p>);
                  })
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                    }}
                  >
                    <p>Currently No Ranks to Display</p>
                  </div>
                )}
              </PanelBody>
            </PanelCard>
          </React.Fragment>
        ) : null}
      </ColumnWrapper>
      <ColumnWrapper>
        <PatchNotesHeader>
          <PatchNotesTitleWrap>
            <PatchNotesAccent />
            <PatchNotesTitle>Hot News</PatchNotesTitle>
          </PatchNotesTitleWrap>
          <Button 
            action={() => {
              return window.location.assign(`${window.location.protocol}//${window.location.host}/news`)
            }}
          >
            All Updates/News
          </Button>
        </PatchNotesHeader>
        {news?.length > 0 ? (() => {
          const visibleNews = news.slice(0, 5);
          const featuredNews = visibleNews[0];
          const secondaryNews = visibleNews.slice(1);

          console.log('news: ', news);

          return (
            <PatchNotesList>
              {featuredNews ? (
                <PatchNotesFeaturedCard onClick={() => goToPatchNote(featuredNews)}>
                  {isNewsFromLastWeek(featuredNews) ? (
                    <PatchNotesBadge>Latest</PatchNotesBadge>
                  ) : null}
                  <PatchNotesHeroImage src={featuredNews?.ImageUrl} alt={featuredNews?.title} />
                  <PatchNotesContent featured>
                    <PatchNotesMetaRow>
                      <PatchNotesTitleText featured>{featuredNews?.title}</PatchNotesTitleText>
                      <PatchNotesDateText>{formatNewsDate(featuredNews, getNewsTimestamp)}</PatchNotesDateText>
                    </PatchNotesMetaRow>
                    {featuredNews?.category ? (
                      <PatchNotesMetaRow style={{ marginBottom: "0" }}>
                        <PatchNotesCategory>{featuredNews?.category}</PatchNotesCategory>
                      </PatchNotesMetaRow>
                    ) : null }
                    <PatchNotesDescription featured>
                      {featuredNews?.description}
                    </PatchNotesDescription>
                  </PatchNotesContent>
                </PatchNotesFeaturedCard>
              ) : null}
              {secondaryNews?.length > 0 ? (
                <PatchNotesGrid>
                  {secondaryNews.map((item, idx) => (
                    <PatchNotesMiniCard
                      key={`${item?.title}-${idx}`}
                      onClick={() => goToPatchNote(item)}
                    >
                      {isNewsFromLastWeek(item) ? (
                        <PatchNotesBadge>Latest</PatchNotesBadge>
                      ) : null}
                      <PatchNotesMiniImage src={item?.ImageUrl} alt={item?.title} />
                      <PatchNotesContent>
                        <PatchNotesMetaRow>
                          <PatchNotesTitleText>{item?.title}</PatchNotesTitleText>
                          <PatchNotesDateText>{formatNewsDate(item, getNewsTimestamp)}</PatchNotesDateText>
                        </PatchNotesMetaRow>
                        {item?.category ? (
                          <PatchNotesMetaRow>
                            <PatchNotesCategory>{item?.category}</PatchNotesCategory>
                          </PatchNotesMetaRow>
                        ) : null }
                        <PatchNotesDescription>
                          {item?.description}
                        </PatchNotesDescription>
                      </PatchNotesContent>
                    </PatchNotesMiniCard>
                  ))}
                </PatchNotesGrid>
              ) : null}
            </PatchNotesList>
          );
        })() : (
          <EmptyState>
            <p>Currently No New News</p>
          </EmptyState>
        )}
      </ColumnWrapper>
      <ColumnWrapper>
        {logged ? (
          <PanelCard>
            <PanelHeader>
              <PanelTitle>Friend List</PanelTitle>
              <Link link="/profile" text="Manage" size="14px" />
            </PanelHeader>
            <FullWidthDivider />
            <PanelBody>
              {tempUser?.friendsList?.length > 0 ? (
                tempUser?.friendsList?.map((friendName, idx) => {
                  return <p key={`${friendName}-${idx}`}>{friendName}</p>;
                })
              ) : (
                <EmptyState>
                  <p>Currently No Friends to Display</p>
                </EmptyState>
              )}
            </PanelBody>
          </PanelCard>
        ) : null}
        <PanelCard>
          <PanelHeader>
            <PanelTitle>Most Recent Created User</PanelTitle>
          </PanelHeader>
          <FullWidthDivider />
          <PanelBody>
            <UserTile user={recentUser} />
          </PanelBody>
        </PanelCard>
      </ColumnWrapper>
    </PageContainer>
  );
};
