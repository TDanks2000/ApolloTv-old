import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {PageChangeContainer, PageChangeIcon} from './PageChange.styles';

type Props = {
  icon_name: string;
  current_page: number;
  setCurrentPage: (page: number) => void;
  page_change_amount: number;
  total_pages: number;

  flatlistRef: React.RefObject<FlatList>;
  disableFN: () => boolean;

  ltr: boolean;
};

const PageChange: React.FC<Props> = ({
  current_page,
  setCurrentPage,
  icon_name,
  page_change_amount,
  total_pages,
  flatlistRef,
  disableFN,
}) => {
  const handlePress = () => {
    if (disableFN() === true) return;
    const newPage = current_page + page_change_amount;
    setCurrentPage(newPage);
    if (!flatlistRef.current) return;
    flatlistRef.current.scrollToIndex({
      index: newPage - 1,
    });
  };

  const disabled = disableFN();

  return (
    <PageChangeContainer onPress={handlePress} disabled={disabled}>
      <PageChangeIcon name={icon_name} />
    </PageChangeContainer>
  );
};

export default PageChange;
