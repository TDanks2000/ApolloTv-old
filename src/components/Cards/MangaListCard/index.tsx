import {MangaCardProps, StackNavigation} from '../../../@types';
import {utils} from '../../../utils';
import {
  Container,
  ExtraText,
  Image,
  Left,
  Right,
  Title,
  Wrapper,
} from './ListCard.styles';
import {useNavigation} from '@react-navigation/native';
import {useBreakpoints} from '../../../hooks';

const MangaListCard = ({
  id,
  title,
  color,
  poster_image,
  rating,
  total_chapters,
  type,
  release_year,
}: MangaCardProps) => {
  const {isMobile} = useBreakpoints();
  const navigation = useNavigation<StackNavigation>();
  const actualTitle = utils.getTitle(title);

  const onPress = () => {
    navigation.navigate('MangaInfo', {
      id,
    });
  };

  return (
    // @ts-ignore
    <Container onPress={onPress} isMobile={isMobile}>
      <Wrapper>
        <Left>
          <Image source={{uri: poster_image}} />
        </Left>
        <Right>
          <Title>{actualTitle}</Title>
          <ExtraText>{release_year ? release_year : '??'}</ExtraText>
          <ExtraText>
            {total_chapters ? `Chapters ${total_chapters}` : `??`}
          </ExtraText>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default MangaListCard;
