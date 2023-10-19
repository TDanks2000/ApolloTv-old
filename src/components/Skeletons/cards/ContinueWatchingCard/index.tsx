import {useWindowDimensions} from 'react-native';
import {
  BottomBanner,
  BottomBannerSubText,
  BottomBannerText,
  Container,
  ExtraText,
  ExtraTextContailer,
  Image,
  PercentWatched,
  PercentWatchedContainer,
  Seperator,
  WhereAmIFromContainer,
  Wrapper,
} from './ContinueWatchingCard.styles';
import {useNavigation} from '@react-navigation/native';
import {useBreakpoints} from '../../../../hooks';

const ContinueWatchingCardSkeleton = () => {
  const {isMobile} = useBreakpoints();
  const navigation: any = useNavigation();

  const {width} = useWindowDimensions();
  const screenSize = isMobile ? width : width * 0.25;

  return (
    <Container width={screenSize}>
      {/* @ts-ignore */}
      <Wrapper>
        <WhereAmIFromContainer></WhereAmIFromContainer>
        <BottomBanner>
          <BottomBannerText></BottomBannerText>
        </BottomBanner>
      </Wrapper>
    </Container>
  );
};

export default ContinueWatchingCardSkeleton;
