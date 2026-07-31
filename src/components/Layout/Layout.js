import styled from "@emotion/styled";

export const Group = styled("div")(({ space, alignItems }) => ({
  display: "flex",
  flexDirection: "row",
  gap: space || 0,
  alignItems: alignItems || 'flex-start'
}));

export const Stack = styled("div")(({ space }) => ({
  display: "flex",
  flexDirection: "column",
  gap: space || 0
}));

export const Layout = {
  Group,
  Stack
};