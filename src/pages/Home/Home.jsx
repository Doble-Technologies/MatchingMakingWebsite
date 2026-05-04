import React from "react";
import styled from "@emotion/styled";
import { theme } from "@src/theme";
import { DonutProgressBar } from "@src/components/DonutProgressBar";
import { gamesMap } from "@src/utilities/maps";
import { Link } from "@src/components/Link";

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
  level: 1,
  progression: 60,
};

const gameInfo = [
  { csgo: { rank: 'L6' } },
  { mch: { rank: 'L1' } }
];

const userFriendsList = [];

export const Home = () => {
  const progress = Math.max(0, Math.min(tempUser.progression, 100));
  return (
    <PageContainer>
      <ColumnWrapper>
        <Card>
          <CardHeader>
            <CardTitle>Current Rank & Levels</CardTitle>
            <DonutProgressBar text={tempUser.level} progress={progress} />
          </CardHeader>
          <LineBreaker style={{ paddingTop: "5px" }} />
          <CardBody>
            {gameInfo?.length > 0 ? (
              gameInfo?.map((item, idx) => {
                const game = gamesMap[Object.keys(item)[0]];
                // const rank = ranksMap[item];
                return <p key={`${game}-${idx}`}>{game}</p>;
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
      </ColumnWrapper>
      <ColumnWrapper>
        <Card>Feed</Card>
      </ColumnWrapper>
      <ColumnWrapper>
        <Card>
          <CardHeader>
            <CardTitle>Friend List</CardTitle>
            <Link link="/profile" text="Manage" size="14px" />
          </CardHeader>
          <LineBreaker style={{ paddingTop: "5px" }} />
          <CardBody>
            {userFriendsList?.length > 0 ? (
              userFriendsList?.map((friendName, idx) => {
                // const rank = ranksMap[item];
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
      </ColumnWrapper>
    </PageContainer>
  );
};
