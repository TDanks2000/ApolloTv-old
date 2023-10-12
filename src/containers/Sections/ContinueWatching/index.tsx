import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {
  SectionContainer,
  SectionTitle,
  SectionTitleContainer,
  SectionTitleIcon,
  SectionWrapper,
} from '../Sections.shared.styles';
import {ContinueWatchingCard} from '../../../components';
import {AnimeTrending} from '../../../utils/TestData';
import {useQuery} from '@tanstack/react-query';
import {episodeSQLHelper} from '../../../utils/database';
import {api, utils} from '../../../utils';
import {useAccessToken} from '../../../contexts';
import {Anilist} from '@tdanks2000/anilist-wrapper';
import {GenericContainer} from '../../../screens/HomeScreen/HomeScreen.styles';

const ContuineWatchingContainer = () => {
  const {accessToken} = useAccessToken();
  const anilist = new Anilist(accessToken);

  const fetcher = async () => {
    const anilistLists = await api.fetchAnilistLists(accessToken, anilist);
    const anilistCurrentData = anilistLists?.current;

    const combineAnilistCurrentData = anilistCurrentData.reduce(
      (acc: any, list: any) => {
        return acc.concat(list.entries);
      },
      [],
    );

    const allData: any = await episodeSQLHelper.SelectALlUnWatched();
    const grouped = await utils.groupBy(allData, 'anime_id');

    // find highest episode in each group
    const highest = Object.keys(grouped).map(key => {
      return grouped[key].reduce((prev: any, current: any) =>
        prev.number > current.number ? prev : current,
      );
    });

    const newList = !highest.length
      ? highest
      : combineAnilistCurrentData.concat(highest);

    const uniqueList = newList
      ? Array.from(
          new Set(
            newList.map((item: any) => {
              return item?.anime_id ? item?.anime_id : item?.media?.id;
            }),
          ),
        ).map(id => {
          return newList.find((item: any) => {
            return item.anime_id
              ? item?.anime_id?.toString() === id?.toString()
              : item?.media?.id.toString() === id!.toString();
          });
        })
      : null;

    uniqueList?.sort((a: any, b: any) => {
      if (!a.updatedAt) return 1;
      if (!b.updatedAt) return 1;
      return a.updatedAt < b.updatedAt ? 1 : -1;
    });

    return uniqueList;
  };

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['ContuineWatching'],
    queryFn: fetcher,
  });

  const renderItem = ({item}: any) => {
    return (
      <ContinueWatchingCard
        {...item}
        poster_image={item.image ?? item.media.coverImage.large}
        episode_number={item.episode_number ?? item.progress + 1}
        watched_percentage={item?.watched_percentage ?? 0}
        title={item.title ?? utils.getTitle(item.media.title)}
        id={item.anime_id ?? item.media.id}
        from={item?.media?.title ? 'anilist' : 'default'}
        nextAiringEpisode={item?.media?.nextAiringEpisode}
        total_episodes={item?.media?.episodes}
      />
    );
  };

  if (isPending || isError) return null;
  if (data && data?.length <= 0) return null;

  return (
    <GenericContainer>
      <SectionContainer>
        <SectionTitleContainer>
          <SectionTitle>Contuine Watching</SectionTitle>
        </SectionTitleContainer>
        <SectionWrapper>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            ItemSeparatorComponent={() => <View style={{width: 20}} />}
            renderItem={renderItem}
            contentContainerStyle={{paddingHorizontal: 20}}
          />
        </SectionWrapper>
      </SectionContainer>
    </GenericContainer>
  );
};

export default ContuineWatchingContainer;
