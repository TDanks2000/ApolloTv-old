import {rgba} from 'polished';
import LinearGradient from 'react-native-linear-gradient';
import {styled} from 'styled-components/native';

interface ContainerProps {
  width: number;
}

export const Container = styled.View<ContainerProps>`
  width: ${({width}) => width - 150}px;
  height: 150px;
  border-radius: 15px;
  overflow: hidden;
`;

export const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

export const Wrapper = styled(LinearGradient).attrs({
  colors: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.45)'],
  start: {x: 0, y: -0.3},
  end: {x: 0, y: 1},
})`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const BottomBanner = styled.View`
  position: relative;
  height: 28%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const BottomBannerText = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: white;
  padding: 0 15px;
`;

export const PercentWatchedContainer = styled.View`
  width: 100%;
  background-color: ${({theme}) => rgba(theme.base.mainColor, 0.4)};
  height: 2px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const PercentWatched = styled.View`
  width: 50%;
  height: 100%;
  background-color: ${({theme}) => theme.base.mainColor};
`;
