import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useAuth } from "@src/Auth";
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

const LineBreaker = styled("div")({
  borderBottom: `1px solid ${theme.colors.border}`,
});

const Card = styled("div")({
  width: "100%",
  padding: "4px",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "6px",
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

const RightPanelCard = styled(Card)({
  padding: "10px",
  background: theme.colors.surface,
  borderColor: theme.colors.border2,
});

const PanelHeader = styled(CardHeader)({
  marginBottom: "4px",
});

const PanelTitle = styled(CardTitle)({
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

const FeedCard = styled(Card)({
  minHeight: "220px",
  padding: "10px",
  background: theme.colors.surface,
  borderColor: theme.colors.border2,
});

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

export const Home = () => {
  const [recentUser, setRecentUser] = useState({});
  const { user } = useAuth();
  const logged = !!user;
  const { level, progression, nextLevelAmount } = transformXpToProgress(user?.xp);

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
            <Card>
              <CardHeader>
                <CardTitle>Current Rank & Levels</CardTitle>
                <DonutProgressBar 
                  text={level || 0}
                  progress={progression || 0}
                  nextLevelAmount={nextLevelAmount || 100}
                /> 
              </CardHeader>
              <LineBreaker style={{ paddingTop: "5px", marginBottom: "5px" }} />
              <CardBody>
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
              </CardBody>
            </Card>
            <Card>Quick Queue</Card>
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
      </ColumnWrapper>
      <ColumnWrapper>
        {logged ? (
          <RightPanelCard>
            <PanelHeader>
              <PanelTitle>Friend List</PanelTitle>
              <Link link="/profile" text="Manage" size="14px" />
            </PanelHeader>
            <LineBreaker style={{ paddingTop: "5px", marginBottom: "5px" }} />
            <CardBody>
              {tempUser?.friendsList?.length > 0 ? (
                tempUser?.friendsList?.map((friendName, idx) => {
                  return <p key={`${friendName}-${idx}`}>{friendName}</p>;
                })
              ) : (
                <EmptyState>
                  <p>Currently No Friends to Display</p>
                </EmptyState>
              )}
            </CardBody>
          </RightPanelCard>
        ) : null}
        <RightPanelCard>
          <PanelHeader>
            <PanelTitle>Most Recent Created User</PanelTitle>
          </PanelHeader>
          <LineBreaker style={{ paddingTop: "5px", marginBottom: "10px" }} />
          <CardBody>
            <UserTile user={recentUser} />
          </CardBody>
        </RightPanelCard>
      </ColumnWrapper>
    </PageContainer>
  );
};
