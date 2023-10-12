import {Modal, ScrollView} from 'react-native';
import React from 'react';
import {ModalContainer, Text} from '../../styles/sharedStyles';
import {
  BackButton,
  BackButtonIcon,
  Container,
  EpisodesWrapper,
  Title,
  TopContainer,
} from './EpisodesModal.styles';

import {EpisodeCard} from '../../components/Cards';
import {
  AnimeInfo,
  Chapter,
  EpisodeInfo,
  FullMangaInfo,
  StackNavigation,
} from '../../@types';
import {utils} from '../../utils';
import {Paginate} from '../../components';
import {episodeSQLHelper} from '../../utils/database';
import {useAccessToken} from '../../contexts';
import {Anilist} from '@tdanks2000/anilist-wrapper';
import {useQuery} from '@tanstack/react-query';
import {TouchableOpacity} from '../../screens/ReaderScreen/Reader.styles';
import {useNavigation} from '@react-navigation/native';

interface Props {
  chapters: Chapter[];
  visible: boolean;
  setVisible: (value: boolean) => void;
  manga_info: FullMangaInfo;
}

const ChaptersModal = ({
  setVisible,
  visible = false,
  chapters,
  manga_info,
}: Props) => {
  const navigation = useNavigation<StackNavigation>();
  const {accessToken} = useAccessToken();
  const anilist = new Anilist(accessToken);

  const [selectedPage, setSelectedPage] = React.useState<number>(1);

  const pageSize = 50;

  const animeTitle = utils.getTitle(manga_info.title);
  const goBack = () => {
    setVisible(false);
  };

  const getEpisodesFromSQLDB = async () => {
    const anilistData = await anilist.media.manga(parseInt(manga_info.id));

    return {anilistData};
  };

  const {
    isError,
    isPending,
    data: dataFromDBAndAnilist,
    error,
  } = useQuery({
    queryKey: ['chaptersInfoFromAnilist', manga_info.id],
    queryFn: getEpisodesFromSQLDB,
  });

  if (isPending) return null;

  const progress =
    (dataFromDBAndAnilist?.anilistData as any)?.data.Media?.mediaListEntry
      ?.progress ?? 0;

  const handlePress = (chapter: Chapter, chapter_number: number) => {
    navigation.navigate('ReaderScreen', {
      chapter_id: chapter.id,
      manga_id: manga_info.id,
      chapter_info: chapter,
      manga_info: manga_info,
      chapter_number: chapter_number + 1,
    });
    setVisible(false);
  };

  return (
    <Modal visible={visible} transparent={true} animationType={'slide'}>
      <ModalContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container>
            <TopContainer>
              <BackButton onPress={goBack}>
                <BackButtonIcon name="arrow-left" />
              </BackButton>
              <Title numberOfLines={1}>{animeTitle}</Title>
            </TopContainer>
            <EpisodesWrapper>
              <Paginate
                results={chapters}
                pageSize={pageSize}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              {chapters
                .slice(
                  selectedPage === 1 ? 0 : (selectedPage - 1) * pageSize,
                  selectedPage === 1 ? pageSize : pageSize * selectedPage + 1,
                )
                .map((chapter, index) => {
                  const findChapter = chapters.find(
                    fChapter => chapter.id === fChapter.id,
                  );
                  const indexInArray = chapters.indexOf(findChapter!);

                  return (
                    <TouchableOpacity
                      onPress={() => handlePress(chapter, indexInArray)}
                      key={`chapter-modal-${chapter.id}-${index}`}>
                      <Text>
                        {chapter?.title?.length < 1
                          ? `Chapter ${indexInArray + 1}`
                          : chapter.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </EpisodesWrapper>
          </Container>
        </ScrollView>
      </ModalContainer>
    </Modal>
  );
};

export default ChaptersModal;
