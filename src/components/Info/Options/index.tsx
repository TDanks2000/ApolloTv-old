import {View, Text} from 'react-native';
import React, {useMemo, useState} from 'react';
import {
  Container,
  OptionContainer,
  OptionDropDown,
  OptionDropDownItem,
  OptionDropDownItemText,
  OptionIcon,
  OptionIcon2,
  OptionIconContainer,
  OptionText,
  OptionWrapper,
  Wrapper,
} from './Options.styles';
import {useBreakpoints} from '../../../hooks';
import {FullAnimeInfo, MediaListStatus, PointType} from '../../../@types';
import {Anilist} from '@tdanks2000/anilist-wrapper';
import {useAccessToken} from '../../../contexts';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {RateModal} from '../../../modals';
import {MiddleOfScreenLoadingComponent} from '../../Shared';

interface Props {
  openEpisodesModal: () => void;
  episodeLegth: number;
  anime_info: FullAnimeInfo;
}

type CollectionOptions = {
  name: string;
  status: MediaListStatus | 'remove';
};

const Options = ({openEpisodesModal, episodeLegth, anime_info}: Props) => {
  const queryClient = useQueryClient();

  const {accessToken} = useAccessToken();
  const anilist = new Anilist(accessToken);

  const collectionOptions: CollectionOptions[] = [
    {name: 'Plan to Watch', status: 'PLANNING'},
    {name: 'Watching', status: 'CURRENT'},
    {name: 'Completed', status: 'COMPLETED'},
    {name: 'Dropped', status: 'DROPPED'},
    {name: 'Paused', status: 'PAUSED'},
    {name: 'ReWatching', status: 'REPEATING'},
    {name: 'remove', status: 'remove'},
  ];

  const [openCollection, toggleCollectionsDropDown] = React.useReducer(
    s => !s,
    false,
  );

  const [openRateModal, setOpenRateModal] = React.useState<boolean>(false);

  const fetchLists = async () => {
    if (!accessToken) {
      return [];
    }

    const returnData = await anilist.media.anime(parseInt(anime_info.id));
    // const anilistUser = (await anilist.user.getCurrentUser()) as any;

    return {
      returnData,
      // anilistUser,
    };
  };

  const {isPending, isError, data, error} = useQuery<any>({
    queryKey: ['get_info_from_anilist', anime_info.id],
    queryFn: fetchLists,
  });

  const anime_data = data?.returnData as any;

  const {isMobile} = useBreakpoints();

  const animeStatus =
    anime_data?.data?.Media?.mediaListEntry?.status?.toLowerCase();

  const animeScore = anime_data?.data?.Media?.mediaListEntry?.score;
  // const scoreFormat = data?.anilistUser?.data?.Viewer?.mediaListOptions
  //   ?.scoreFormat as PointType | undefined;
  const isFavourite = anime_data?.data?.Media?.isFavourite;

  const actualAnimeStatus = collectionOptions.find(
    option => option.status.toLowerCase() === animeStatus,
  );

  const invalidateQuery = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['get_info_from_anilist', anime_info.id],
      exact: true,
    });
  };

  const onCollectionOptionPress = async (option: CollectionOptions) => {
    try {
      if (option.status === 'remove') {
        await anilist.user.deleteShow(parseInt(anime_info.id));
      } else {
        await anilist.user.updateMedia({
          mediaId: parseInt(anime_info.id),
          status: option.status,
        });
      }

      await invalidateQuery();

      Toast.show({
        type: 'success',
        autoHide: true,
        position: 'top',
        text1: '🎉 Collection Updated',
        text2: `Collection status updated to ${option.name}`,
      });
      toggleCollectionsDropDown();
    } catch (error) {
      return Toast.show({
        type: 'error',
        autoHide: true,
        position: 'top',
        text1: '❌ Collection Update Error',
        text2: `Failed to update collection status`,
      });
    }
  };

  const onFavoruiteOptionPress = async () => {
    try {
      await anilist.media.favouriteAnime(parseInt(anime_info.id));

      await invalidateQuery();

      Toast.show({
        type: 'success',
        autoHide: true,
        position: 'top',
        text1: isFavourite ? '🎉 Show Un Favorited' : '🎉 Show Favorited',
        text2: isFavourite
          ? `show has been Un Favorited!`
          : `show has been Favorited!`,
      });
    } catch (error) {
      return Toast.show({
        type: 'error',
        autoHide: true,
        position: 'top',
        text1: '❌ Favorited Update Error',
        text2: `Failed to favorite show`,
      });
    }
  };

  return (
    <>
      <Container>
        <Wrapper isMobile={isMobile}>
          <OptionContainer>
            <OptionWrapper
              onPress={openEpisodesModal}
              disabled={episodeLegth === 0}>
              <OptionIconContainer>
                <OptionIcon2 name="card-multiple-outline" />
              </OptionIconContainer>
              <OptionText>Episodes</OptionText>
            </OptionWrapper>
          </OptionContainer>

          <OptionContainer>
            <OptionWrapper
              onPress={toggleCollectionsDropDown}
              onLongPress={e => {
                return onCollectionOptionPress({
                  name: 'remove',
                  status: 'remove',
                });
              }}
              delayLongPress={1000}
              disabled={!accessToken || isPending}>
              <OptionIconContainer>
                <OptionIcon name="list-ul" />
              </OptionIconContainer>
              <OptionText>
                {animeStatus && actualAnimeStatus
                  ? actualAnimeStatus.name
                  : 'Collections'}
              </OptionText>
            </OptionWrapper>
            {accessToken ? (
              <OptionDropDown isOpen={openCollection}>
                {collectionOptions.map((option, index) => {
                  const isSelected =
                    option.status.toLowerCase() === animeStatus;
                  return (
                    <OptionDropDownItem
                      disabled={isSelected}
                      active={isSelected}
                      key={`${option.name}-${index}`}
                      onPress={() => onCollectionOptionPress(option)}>
                      <OptionDropDownItemText>
                        {option.name}
                      </OptionDropDownItemText>
                    </OptionDropDownItem>
                  );
                })}
              </OptionDropDown>
            ) : null}
          </OptionContainer>

          <OptionContainer>
            <OptionWrapper
              onPress={() => setOpenRateModal(true)}
              disabled={!accessToken}>
              <OptionIconContainer>
                <OptionIcon name="star" />
              </OptionIconContainer>
              <OptionText>
                {animeScore
                  ? parseInt(animeScore) >= 100
                    ? animeScore
                    : `${String(animeScore).padEnd(2, '0')}/100`
                  : 'Rate'}
              </OptionText>
            </OptionWrapper>
          </OptionContainer>

          <OptionContainer>
            <OptionWrapper
              onPress={onFavoruiteOptionPress}
              disabled={!accessToken}>
              <OptionIconContainer>
                <OptionIcon name={isFavourite ? 'heart' : 'heart-o'} />
              </OptionIconContainer>
              <OptionText>Favourite</OptionText>
            </OptionWrapper>
          </OptionContainer>
        </Wrapper>
      </Container>
      {accessToken ? (
        <RateModal
          visible={openRateModal}
          closeFunction={() => setOpenRateModal(false)}
          anime_info={anime_info}
          score={animeScore}
        />
      ) : null}
    </>
  );
};

export default Options;
