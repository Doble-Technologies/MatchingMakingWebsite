import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useAuth } from "@src/Auth";
import { theme } from "@src/theme";
import { DonutProgressBar } from "@src/components/DonutProgressBar";
import { gamesMap, transformXpToProgress } from "@src/utilities/maps";
import { Link } from "@src/components/Link";
import { UserTile } from "@src/components/UserTile";
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
            <UserTile user={recentUser} />
          </CardBody>
        </Card>
      </ColumnWrapper>
    </PageContainer>
  );
};
