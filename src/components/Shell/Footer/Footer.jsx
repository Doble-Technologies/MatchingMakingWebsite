import styled from '@emotion/styled';
import { theme } from '@src/theme';

const Wrapper = styled('nav')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 28px',
  height: '52px',
  width: '100%',
  background: theme.colors.surface,
  borderTop: `1px solid ${theme.colors.border}`,
  fontFamily: theme.fonts.head,
  flexShrink: 0
});

const Text = styled('p')({
  color: theme.colors.border2
})

export const Footer = () => {
  return (
    <Wrapper>
      <Text>
        © 2026 RCS Labs. All rights reserved.
      </Text>
    </Wrapper>
  );
};