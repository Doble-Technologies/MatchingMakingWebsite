import React from "react";
import styled from "@emotion/styled";
import { theme } from "@src/theme";
import { DonutProgressBar } from "@src/components/DonutProgressBar";
import { gamesMap } from "@src/utilities/maps";
import { Link } from "@src/components/Link";
import { UserTile } from "@src/components/UserTile";

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
const tempUser = {
  displayName: 'Carnage',
  level: 1,
  progression: 60,
  friendsList: []
};

const tempRecentUser = {
  displayName: 'TidalShocasdfasdfasdfadsfk',
  doj: 'May 4, 2026',
  avatar: null,
  level: 1,
  progression: 2
};

const gameInfo = [
  { csgo: { rank: 'L6' } },
  { mch: { rank: 'L1' } }
];

export const Home = () => {
  const logged = tempUser?.displayName;
  const progress = Math.max(0, Math.min(tempUser.progression, 100));
  return (
    <PageContainer>
      <ColumnWrapper>
        {logged ? (
          <React.Fragment>
            <Card>
              <CardHeader>
                <CardTitle>Current Rank & Levels</CardTitle>
                {tempUser?.level ? (
                  <DonutProgressBar 
                    text={tempUser.level || 1}
                    progress={progress || 0}
                  /> 
                ) : null }
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
        <Card>Feed</Card>
      </ColumnWrapper>
      <ColumnWrapper>
        {logged ? (
          <Card>
            <CardHeader>
              <CardTitle>Friend List</CardTitle>
              <Link link="/profile" text="Manage" size="14px" />
            </CardHeader>
            <LineBreaker style={{ paddingTop: "5px", marginBottom: "5px" }} />
            <CardBody>
              {tempUser?.friendsList?.length > 0 ? (
                tempUser?.friendsList?.map((friendName, idx) => {
                  return <p key={`${friendName}-${idx}`}>{friendName}</p>;
                })
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                  }}
                >
                  <p>Currently No Friends to Display</p>
                </div>
              )}
            </CardBody>
          </Card>
        ) : null}
        <Card>
          <CardHeader>
            <CardTitle>Most Recent Created User</CardTitle>
          </CardHeader>
          <LineBreaker style={{ paddingTop: "5px", marginBottom: "5px" }} />
          <CardBody>
            <UserTile user={tempRecentUser} />
          </CardBody>
        </Card>
      </ColumnWrapper>
    </PageContainer>
  );
};
