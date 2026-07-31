import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@src/components/Common/Button';

const Wrapper = styled('div')({
  display: 'flex'
});

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
        action={previousPage}
        multiple
      >
        Previous
      </Button>
      <Button 
        disabled={isLastPage}
        action={nextPage}
        multiple
      >
        Next
      </Button>
    </Wrapper>
  )
};