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
import {FullAnimeInfo, ITitleLanguageOptions} from '../../../@types';
import {utils} from '../../../utils';

interface Props {
  data: FullAnimeInfo;
}

const MetaInfo = ({data}: Props) => {
  const now = new Date();
  const actualTitle = utils.getTitle(data.title);
  const actualGenres = data.genres?.slice(0, 2);

  return (
    <Container>
      <Wrapper>
        <TopMetaInfo>
          <Text style={{textTransform: 'uppercase'}}>
            {data.startDate.year ?? '??'} -{' '}
            {data.status.toLowerCase() === 'ongoing'
              ? 'Present'
              : data.endDate.year ?? '??'}
          </Text>
          <Seperator />
          <Text>
            {`${data.episodes.length ?? 0} / ${data.totalEpisodes}`} Episodes
          </Text>
          <Seperator />
        </TopMetaInfo>
        <Title numberOfLines={1}>{actualTitle}</Title>
        <BottomMetaInfo>
          {actualGenres?.map((genre, index) => (
            <BottomMetaInfoItem key={`genre-meta-info-${index + 1}`}>
              <AltText>{genre}</AltText>
            </BottomMetaInfoItem>
          ))}
          <BottomMetaInfoItem>
            <AltText bold={true}>{data.isAdult ? '18+' : '13+'}</AltText>
          </BottomMetaInfoItem>
        </BottomMetaInfo>
      </Wrapper>
    </Container>
  );
};

export default MetaInfo;
