import {View} from 'react-native';
import {Container, RatingContainer, Title, Wrapper} from './MainCard.styles';

const MainCardSkeleton = () => {
  return (
    <Container>
      <Wrapper>
        <RatingContainer />
        <View>
          <Title />
          {/* <SubTitle /> */}
        </View>
      </Wrapper>
    </Container>
  );
};

export default MainCardSkeleton;
