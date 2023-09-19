import {
  BottomBanner,
  BottomBannerTextContainer,
  EpisodeContainer,
  EpisodeImageBackground,
  EpisodeNumber,
  EpisodeTitle,
  PercentWatched,
  PercentWatchedContainer,
  Wrapper,
} from './ChapterCard';
import {Chapter, FullMangaInfo, StackNavigation} from '../../../@types';
import {useNavigation} from '@react-navigation/native';
import {Text} from '../../../styles/sharedStyles';

type Props = {
  manga_info: FullMangaInfo;
  chapter_info: Chapter;
  hideChapterModal: () => void;
};

const ChapterCard: React.FC<Props> = props => {
  let {manga_info, chapter_info, hideChapterModal} = props;

  const navigation = useNavigation<StackNavigation>();

  const onPress = () => {};

  return (
    <EpisodeContainer onPress={onPress}>
      {/* @ts-ignore */}
      <Wrapper>
        {/* <Text>{chapter_info?.title?.length < 1 ? }</Text> */}
      </Wrapper>
    </EpisodeContainer>
  );
};

export default ChapterCard;
