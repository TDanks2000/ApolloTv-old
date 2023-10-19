import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {styled} from 'styled-components/native';
import {rgba} from 'polished';

interface ContainerProps {
  width: number;
  isMobile: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: ${({width}) => width}px;
  height: ${({isMobile}) => (isMobile ? ' 250px' : '300px')};
  border-radius: 15px;
  overflow: hidden;

  background: ${({theme}) => rgba(theme.text.offWhite, 0.2)};
`;

export const Wrapper = styled.View`
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TopContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 10px;
`;

export const Title = styled.View`
  width: 60%;
  height: 45px;
  border-radius: 8px;
  background: ${({theme}) => theme.base.navBg};
`;

export const RatingContainer = styled.View`
  width: 60px;
  height: 35px;
  align-items: center;
  border-radius: 10px;
  background: ${({theme}) => theme.base.navBg};
`;

export const WatchNowContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const WatchNowButton = styled.View`
  position: relative;
  background: ${({theme}) => theme.base.navBg};
  width: 150px;
  height: 45px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  max-width: 180px;
`;
