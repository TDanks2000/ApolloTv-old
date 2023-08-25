import {View, Text} from 'react-native';
import React from 'react';
import {
  Container,
  OptionContainer,
  OptionDropDown,
  OptionDropDownItem,
  OptionDropDownItemText,
  OptionIcon,
  OptionIconContainer,
  OptionText,
  OptionWrapper,
  Wrapper,
} from './Options.styles';
import {useBreakpoints} from '../../../hooks';
import {FullAnimeInfo, MediaListStatus} from '../../../@types';
import {Anilist} from '@tdanks2000/anilist-wrapper';
import {useAccessToken} from '../../../contexts';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

interface Props {
  openEpisodesModal: () => void;
  episodeLegth: number;
  anime_info: FullAnimeInfo;
}

type CollectionOptions = {
  name: string;
  status: MediaListStatus;
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
  ];

  const [openCollection, toggleCollectionsDropDown] = React.useReducer(
    s => !s,
    false,
  );

  const fetchLists = async () => {
    const returnData = await anilist.media.anime(parseInt(anime_info.id));
    return returnData;
  };

  const {
    isPending,
    isError,
    data: anime_data,
    error,
  } = useQuery({
    queryKey: ['get_info_from_anilist'],
    queryFn: fetchLists,
  });

  const {isMobile} = useBreakpoints();

  const animeStatus = (
    anime_data as any
  )?.data?.Media?.mediaListEntry?.status?.toLowerCase();

  const actualAnimeStatus = collectionOptions.find(
    option => option.status.toLowerCase() === animeStatus,
  );

  const onCollectionOptionPress = async (option: CollectionOptions) => {
    try {
      await anilist.user.updateShow({
        mediaId: parseInt(anime_info.id),
        status: option.status,
      });
      queryClient.invalidateQueries({
        queryKey: ['get_info_from_anilist'],
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
            onPress={openEpisodesModal}
            disabled={episodeLegth === 0}>
            <OptionIconContainer>
              <OptionIcon name="arrow-circle-o-down" />
            </OptionIconContainer>
            <OptionText>Episodes</OptionText>
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
              {animeStatus && actualAnimeStatus
                ? actualAnimeStatus.name
                : 'Collections'}
            </OptionText>
          </OptionWrapper>
          <OptionDropDown isOpen={openCollection}>
            {collectionOptions.map((option, index) => {
              const isSelected = option.status.toLowerCase() === animeStatus;
              return (
                <OptionDropDownItem
                  disabled={isSelected}
                  active={isSelected}
                  key={`${option.name}-${index}`}
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

        {/* <OptionContainer>
          <OptionWrapper disabled>
            <OptionIconContainer>
              <OptionIcon name="download" />
            </OptionIconContainer>
            <OptionText>Download</OptionText>
          </OptionWrapper>
        </OptionContainer>

        <OptionContainer>
          <OptionWrapper disabled>
            <OptionIconContainer>
              <OptionIcon name="ellipsis-v" />
            </OptionIconContainer>
            <OptionText>Related</OptionText>
          </OptionWrapper>
        </OptionContainer> */}
      </Wrapper>
    </Container>
  );
};

export default Options;
