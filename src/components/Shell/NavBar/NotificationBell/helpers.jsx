import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@src/theme';

const Wrapper = styled('div')({
  display: 'flex'
});

const Button = styled('div')(({ disabled }) => ({
  padding: '4px 10px',
  border: `1px solid ${theme.colors.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: disabled ? theme.colors.muted : theme.colors.muted2,
  fontSize: '12px',
  fontWeight: '600',
  letterSpacing: '1.5px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? 0.4 : 1,
  transition: 'all .15s',
  '&:first-of-type': {
    borderRadius: '4px 0 0 4px',
  },
  '&:last-of-type': {
    borderRadius: '0 4px 4px 0',
    marginLeft: '-1px',
  },
  ...(!disabled ? {
    '&:hover': {
      background: theme.colors.accentDim,
      borderColor: theme.colors.accent,
      color: theme.colors.accent,
      zIndex: 1,
    }
  } : null)
}));

export const FooterPagination = ({ total, pagination, setPagination }) => {
  const totalPages = Math.ceil(total / pagination?.pageSize);
  const isFirstPage = pagination?.pageIndex <= 0;
  const isLastPage  = pagination?.pageIndex >= totalPages - 1;

  const previousPage = () => {
    if (!isFirstPage) {
      setPagination(p => ({ ...p, pageIndex: p.pageIndex - 1 }));
    };
  };

  const nextPage = () => {
    if (!isLastPage) {
      setPagination(p => ({ ...p, pageIndex: p.pageIndex + 1 }));
    };
  };

  return (
    <Wrapper>
      <Button 
        disabled={isFirstPage}
        onClick={previousPage}
      >
        Previous
      </Button>
      <Button 
        disabled={isLastPage}
        onClick={nextPage}
      >
        Next
      </Button>
    </Wrapper>
  )
};