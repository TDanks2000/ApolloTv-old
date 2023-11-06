import React from 'react';
import {
  Container,
  OptionContainer,
  OptionIcon,
  OptionIconContainer,
  OptionText,
  OptionWrapper,
  Wrapper,
  OptionDropDown,
  OptionDropDownItem,
  OptionDropDownItemText,
} from '../../Info/Options/Options.styles';

import {FullMangaInfo, MediaListStatus} from '../../../@types';
import {useBreakpoints} from '../../../hooks';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useAccessToken} from '../../../contexts';
import {Anilist} from '@tdanks2000/anilist-wrapper';
import Toast from 'react-native-toast-message';
import {RateModal} from '../../../modals';

type CollectionOptions = {
  name: string;
  status: MediaListStatus;
};

type Props = {
  openChaptersModal: () => void;
  chaptersLength: number;
  manga_info: FullMangaInfo;
};

const Options: React.FC<Props> = ({
  chaptersLength,
  manga_info,
  openChaptersModal,
}) => {
  const queryClient = useQueryClient();

  const {accessToken} = useAccessToken();
  const anilist = new Anilist(accessToken);

  const [openRateModal, setOpenRateModal] = React.useState<boolean>(false);

  const {isMobile} = useBreakpoints();

  const collectionOptions: CollectionOptions[] = [
    {name: 'Plan to Read', status: 'PLANNING'},
    {name: 'Reading', status: 'CURRENT'},
    {name: 'Completed', status: 'COMPLETED'},
    {name: 'Dropped', status: 'DROPPED'},
    {name: 'Paused', status: 'PAUSED'},
    {name: 'Re Reading', status: 'REPEATING'},
  ];

  const [openCollection, toggleCollectionsDropDown] = React.useReducer(
    s => !s,
    false,
  );

  const fetchLists = async () => {
    const returnData = !accessToken
      ? []
      : await anilist.media.manga(parseInt(manga_info.id));
    return returnData;
  };

  const {
    isPending,
    isError,
    data: manga_data,
    error,
  } = useQuery<any>({
    queryKey: ['get_info_from_anilist_manga', manga_info.id],
    queryFn: fetchLists,
  });

  const mangaStatus =
    manga_data?.data?.Media?.mediaListEntry?.status?.toLowerCase();

  const mangaScore = manga_data?.data?.Media?.mediaListEntry?.score;
  const isFavourite = manga_data?.data?.Media?.isFavourite;

  const actualAnimeStatus = collectionOptions.find(
    option => option.status.toLowerCase() === mangaStatus,
  );

  const invalidateQuery = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['get_info_from_anilist_manga', manga_info.id],
      exact: true,
    });
  };

  const onCollectionOptionPress = async (option: CollectionOptions) => {
    try {
      await anilist.user.updateMedia({
        mediaId: parseInt(manga_info.id),
        status: option.status,
      });

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
      await anilist.media.favouriteManga(parseInt(manga_info.id));

      await invalidateQuery();

      Toast.show({
        type: 'success',
        autoHide: true,
        position: 'top',
        text1: isFavourite ? '🎉 Manga Un Favorited' : '🎉 Manga Favorited',
        text2: isFavourite
          ? `Manga has been Un Favorited!`
          : `Manga has been Favorited!`,
      });
    } catch (error) {
      return Toast.show({
        type: 'error',
        autoHide: true,
        position: 'top',
        text1: '❌ Favorited Update Error',
        text2: `Failed to favorite Manga`,
      });
    }
  };

  return (
    <>
      <Container>
        <Wrapper isMobile={isMobile}>
          <OptionContainer>
            <OptionWrapper
              onPress={openChaptersModal}
              disabled={chaptersLength === 0}>
              <OptionIconContainer>
                <OptionIcon name="book" />
              </OptionIconContainer>
              <OptionText>Chapters</OptionText>
            </OptionWrapper>
          </OptionContainer>

          <OptionContainer>
            <OptionWrapper
              onPress={toggleCollectionsDropDown}
              disabled={!accessToken || isPending}>
              <OptionIconContainer>
                <OptionIcon name="list-ul" />
              </OptionIconContainer>
              <OptionText>
                {mangaStatus && actualAnimeStatus
                  ? actualAnimeStatus.name
                  : 'Collections'}
              </OptionText>
            </OptionWrapper>
            {accessToken ? (
              <OptionDropDown isOpen={openCollection}>
                {collectionOptions.map((option, index) => {
                  const isSelected =
                    option.status.toLowerCase() === mangaStatus;
                  return (
                    <OptionDropDownItem
                      disabled={isSelected}
                      active={isSelected}
                      key={`${option.name}-manga-${index}`}
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
              disabled={!accessToken || isPending}>
              <OptionIconContainer>
                <OptionIcon name="star" />
              </OptionIconContainer>
              <OptionText>
                {mangaScore
                  ? parseInt(mangaScore) >= 100
                    ? mangaScore
                    : `${String(mangaScore).padEnd(2, '0')}/100`
                  : 'Rate'}
              </OptionText>
            </OptionWrapper>
          </OptionContainer>

          <OptionContainer>
            <OptionWrapper
              onPress={onFavoruiteOptionPress}
              disabled={!accessToken || isPending}>
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
          manga_info={manga_info}
          score={mangaScore}
        />
      ) : null}
    </>
  );
};

export default Options;
