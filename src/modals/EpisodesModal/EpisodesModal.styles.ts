import Icon from 'react-native-vector-icons/FontAwesome';
import {rgba} from 'polished';
import LinearGradient from 'react-native-linear-gradient';
import {styled} from 'styled-components/native';

export const Container = styled.View`
  padding: ${({theme}) => theme.spacing.paddingLeft};
`;

export const TopContainer = styled.View`
  width: 100%;
  margin-bottom: ${({theme}) => theme.spacing.paddingBottom};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: black;
  border-radius: 999px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BackButtonIcon = styled(Icon)`
  color: white;
  font-size: 20px;
`;

export const Title = styled.Text`
  padding-right: ${({theme}) => theme.spacing.paddingRight};
  color: white;
  font-size: 20px;
  font-family: ${({theme}) => theme.text.fonts.openSans.bold};
`;

export const EpisodeContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  width: 100%;
  height: 130px;
  border-radius: 8px;
  overflow: hidden;
  background: ${({theme}) => theme.base.mainColor};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const EpisodeLeft = styled.View`
  width: 45%;
  height: 100%;
  overflow: hidden;
`;

export const EpisodeImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
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
  align-items: center;
`;

export const BottomBanner = styled.View`
  position: relative;
  height: 50%;
  margin-bottom: -1px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const BottomBannerTextContainer = styled.View`
  padding: 15px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

export const EpisodeNumber = styled.Text`
  color: ${({theme}) => theme.text.offWhite};
  font-family: ${({theme}) => theme.text.fonts.openSans.regular};
`;

export const EpisodeTitle = styled.Text`
  color: white;
  font-family: ${({theme}) => theme.text.fonts.openSans.regular};
`;

export const PercentWatchedContainer = styled.View`
  width: 100%;
  background-color: ${({theme}) => rgba(theme.base.mainColor, 0.4)};
  height: 5px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const PercentWatched = styled.View`
  width: 50%;
  height: 100%;
  background-color: ${({theme}) => theme.base.mainColor};
`;
