import {Modal, Text} from 'react-native';
import React from 'react';
import BaseModal from '../BaseModal';
import {
  Background,
  Container,
  FilterTypeContainer,
  FilterTypeText,
} from './SearchFilterOptions..styles';
import {SearchFilter} from '../../components';

type Props = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;

  wantManga: boolean;
  setWantManga: (manga: boolean) => void;
};

const SearchFilterOptions: React.FC<Props> = ({
  showModal,
  setShowModal,
  setWantManga,
  wantManga,
}) => {
  const closeFunction = () => {
    setShowModal(false);
  };

  return (
    <BaseModal
      visible={showModal}
      closeFunction={closeFunction}
      animationType={'slide'}>
      <Background>
        <Container>
          <FilterTypeContainer>
            <FilterTypeText>Media Type</FilterTypeText>
            <SearchFilter.MediaType
              setWantManga={setWantManga}
              wantManga={wantManga}
            />
          </FilterTypeContainer>
          <FilterTypeText>Genres</FilterTypeText>
          <FilterTypeText>Year</FilterTypeText>
          <FilterTypeText>Season</FilterTypeText>
          <FilterTypeText>Format</FilterTypeText>
        </Container>
      </Background>
    </BaseModal>
  );
};

export default SearchFilterOptions;
