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
    const returnData = await anilist.media.manga(parseInt(manga_info.id));
    return returnData;
  };

  const {
    isPending,
    isError,
    data: manga_data,
    error,
  } = useQuery({
    queryKey: ['get_info_from_anilist_manga'],
    queryFn: fetchLists,
  });

  const mangaStatus = (
    manga_data as any
  )?.data?.Media?.mediaListEntry?.status?.toLowerCase();

  const actualAnimeStatus = collectionOptions.find(
    option => option.status.toLowerCase() === mangaStatus,
  );
  console.log(JSON.stringify(mangaStatus));

  const onCollectionOptionPress = async (option: CollectionOptions) => {
    try {
      await anilist.user.updateShow({
        mediaId: parseInt(manga_info.id),
        status: option.status,
      });
      queryClient.invalidateQueries({
        queryKey: ['get_info_from_anilist_manga'],
        exact: true,
      });
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

  return (
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
          <OptionDropDown isOpen={openCollection}>
            {collectionOptions.map((option, index) => {
              const isSelected = option.status.toLowerCase() === mangaStatus;
              return (
                <OptionDropDownItem
                  disabled={isSelected}
                  active={isSelected}
                  key={`${option.name}-manga-${index}`}
                  onPress={() => onCollectionOptionPress(option)}>
                  <OptionDropDownItemText>{option.name}</OptionDropDownItemText>
                </OptionDropDownItem>
              );
            })}
          </OptionDropDown>
        </OptionContainer>

        <OptionContainer>
          <OptionWrapper disabled>
            <OptionIconContainer>
              <OptionIcon name="ban" />
            </OptionIconContainer>
            <OptionText style={{textTransform: 'uppercase'}}>W.I.P</OptionText>
          </OptionWrapper>
        </OptionContainer>

        <OptionContainer>
          <OptionWrapper disabled>
            <OptionIconContainer>
              <OptionIcon name="ban" />
            </OptionIconContainer>
            <OptionText style={{textTransform: 'uppercase'}}>W.I.P</OptionText>
          </OptionWrapper>
        </OptionContainer>
      </Wrapper>
    </Container>
  );
};

export default Options;
