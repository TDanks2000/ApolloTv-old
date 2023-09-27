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

          <FilterTypeContainer>
            <FilterTypeText>Year</FilterTypeText>
            <SearchFilter.Year />
          </FilterTypeContainer>

          <FilterTypeContainer>
            <FilterTypeText>Genres</FilterTypeText>
            <SearchFilter.Genres />
          </FilterTypeContainer>

          <FilterTypeContainer>
            <FilterTypeText>Season</FilterTypeText>
            <SearchFilter.Season />
          </FilterTypeContainer>

          <FilterTypeContainer>
            <FilterTypeText>Format</FilterTypeText>
            <SearchFilter.Format />
          </FilterTypeContainer>

          <FilterTypeContainer>
            <FilterTypeText>Status</FilterTypeText>
            <SearchFilter.Status />
          </FilterTypeContainer>
        </Container>
      </Background>
    </BaseModal>
  );
};

export default SearchFilterOptions;
