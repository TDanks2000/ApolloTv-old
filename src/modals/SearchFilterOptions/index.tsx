import React from 'react';
import BaseModal from '../BaseModal';
import {
  Background,
  Container,
  FilterTypeContainer,
  FilterTypeText,
  Seperator,
  Title,
} from './SearchFilterOptions..styles';
import {SearchFilter} from '../../components';

type Props = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;

  year?: string;
  genres?: string[];
  season?: string;
  format?: string;
  status?: string;
  sort?: string[];

  setYear: (year: string) => void;
  setGenres: (genres: string[]) => void;
  setSeason: (season: string) => void;
  setFormat: (format: string) => void;
  setStatus: (status: string) => void;
  setSort: (sort: string[]) => void;

  wantManga: boolean;
  setWantManga: (manga: boolean) => void;
};

const SearchFilterOptions: React.FC<Props> = ({
  showModal,
  setShowModal,
  setWantManga,
  wantManga,
  year,
  genres,
  season,
  format,
  status,
  sort,
  setYear,
  setGenres,
  setSeason,
  setFormat,
  setStatus,
  setSort,
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
          <Title>Filter</Title>
          <Seperator />
          <FilterTypeContainer>
            <FilterTypeText>Media Type</FilterTypeText>
            <SearchFilter.MediaType
              setWantManga={setWantManga}
              wantManga={wantManga}
            />
          </FilterTypeContainer>

          {wantManga ? null : (
            <>
              <FilterTypeContainer>
                <FilterTypeText>Year</FilterTypeText>
                <SearchFilter.Year year={year} setYear={setYear} />
              </FilterTypeContainer>

              <FilterTypeContainer>
                <FilterTypeText>Genres</FilterTypeText>
                <SearchFilter.Genres genres={genres} setGenres={setGenres} />
              </FilterTypeContainer>

              <FilterTypeContainer>
                <FilterTypeText>Season</FilterTypeText>
                <SearchFilter.Season season={season} setSeason={setSeason} />
              </FilterTypeContainer>

              <FilterTypeContainer>
                <FilterTypeText>Format</FilterTypeText>
                <SearchFilter.Format format={format} setFormat={setFormat} />
              </FilterTypeContainer>

              <FilterTypeContainer>
                <FilterTypeText>Status</FilterTypeText>
                <SearchFilter.Status status={status} setStatus={setStatus} />
              </FilterTypeContainer>
            </>
          )}
        </Container>
      </Background>
    </BaseModal>
  );
};

export default SearchFilterOptions;
