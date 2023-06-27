import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {
  PaginateContainer,
  PaginatePill,
  PaginatePillText,
  PaginateWrapper,
} from './Paginate.styles';

interface PaginateProps {
  results: any[];
  pageSize?: number;
  setSelectedPage: (page: number) => void;
  selectedPage: number;
}

const Paginate = ({
  results,
  pageSize = 25,
  setSelectedPage,
  selectedPage,
}: PaginateProps) => {
  const totalPageCount = Math.ceil(results.length / pageSize);
  const pages = new Array(totalPageCount).fill(0);

  if (totalPageCount === 1) return null;
  return (
    <PaginateContainer>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <PaginateWrapper>
          {pages.map((_, i) => {
            const currentPageAmount = i + 1 === 1 ? 1 : i * pageSize + 1;
            let currentPageMaxAmount =
              i + 1 === 1 ? pageSize : pageSize * (i + 1) + 1;

            if (currentPageMaxAmount > results.length)
              currentPageMaxAmount = results.length;

            return (
              <PaginatePill
                key={`page-${i}`}
                onPress={() => setSelectedPage(i + 1)}
                active={i + 1 === selectedPage}>
                <PaginatePillText>
                  {currentPageAmount} - {currentPageMaxAmount}
                </PaginatePillText>
              </PaginatePill>
            );
          })}
        </PaginateWrapper>
      </ScrollView>
    </PaginateContainer>
  );
};

export default Paginate;
