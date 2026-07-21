import React from 'react';
import styled from "@emotion/styled";


const PageContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "24% 50% 24%",
  padding: "10px",
  gap: "1%",
});


export const Profile = () => {
  return (
    <PageContainer>
      <p>Pro</p>

    </PageContainer>
  )
}