import styled from "@emotion/styled";

export const Layout = {
  Group: styled("div")(({ space, alignItems, alignLayout }) => ({
    display: "flex",
    flexDirection: "row",
    gap: space || 0,
    alignItems: alignItems || 'flex-start'
  })),
  Stack: styled("div")(({ space }) => ({
    display: "flex",
    flexDirection: "column",
    gap: space || 0
  }))
};