import React, {useEffect} from 'react';
import {
  BottomMetaInfo,
  BottomMetaInfoItem,
  Container,
  Seperator,
  Title,
  TopMetaInfo,
  Text,
  AltText,
  Wrapper,
} from './MetaInfo.styles';
import {ITitleLanguageOptions} from '../../../@types';
import {utils} from '../../../utils';

interface Props {
  release_year: string;
  total_episodes: string;
  genres: string[];
  rating: string;
  title: string | ITitleLanguageOptions;

  isAdult?: boolean;
}

const MetaInfo = ({
  release_year,
  total_episodes,
  genres,
  rating,
  title,
  isAdult,
}: Props) => {
  const actualTitle = utils.getTitle(title);
  const actualGenres = genres?.slice(0, 2);

  return (
    <Container>
      <Wrapper>
        <TopMetaInfo>
          <Text>{release_year ?? '??'}</Text>
          <Seperator />
          <Text>{total_episodes ?? 0} Episodes</Text>
        </TopMetaInfo>
        <Title numberOfLines={1}>{actualTitle}</Title>
        <BottomMetaInfo>
          {actualGenres?.map((genre, index) => (
            <BottomMetaInfoItem key={`genre-meta-info-${index + 1}`}>
              <AltText>{genre}</AltText>
            </BottomMetaInfoItem>
          ))}
          <BottomMetaInfoItem>
            <AltText bold={true}>{isAdult ? '18+' : '13+'}</AltText>
          </BottomMetaInfoItem>
        </BottomMetaInfo>
      </Wrapper>
    </Container>
  );
};

export default MetaInfo;
