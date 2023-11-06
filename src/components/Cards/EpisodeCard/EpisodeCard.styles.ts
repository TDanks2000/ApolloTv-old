import {rgba} from 'polished';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styled} from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';
import {Animated} from 'react-native';

export const EpisodeContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  position: relative;
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
  position: relative;
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
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
`;

export const EpisodeTitle = styled.Text`
  color: white;
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
`;

export const PercentWatchedContainer = styled(Animated.View)`
  width: 100%;
  background-color: ${({theme}) => rgba(theme.base.mainColor, 0.4)};
  height: 4px;
  position: absolute;
  top: -4px;
  left: 0;
`;

interface PercentWatchedProps {
  watchedPercent: number;
}

export const PercentWatched = styled.View<PercentWatchedProps>`
  width: ${({watchedPercent}) => watchedPercent}%;
  height: 100%;
  background-color: ${({theme}) => theme.base.mainColor};
`;

export const DownloadWrapper = styled.View`
  position: absolute;
  right: 0;
  top: 0;
  margin: 3px;
  z-index: 111;
  background: black;
  border-radius: 9999px;
  overflow: hidden;
  width: 35px;
  height: 35px;
`;

export const DownloadContainer = styled.View`
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

type Props = {
  downloadProgress?: number;
};

export const DownloadBackground = styled(Animated.View)<Props>`
  width: ${({downloadProgress}) =>
    downloadProgress ? `${downloadProgress}%` : 0};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  background-color: ${({theme}) => theme.base.mainColor};
  /* z-index: 1; */
`;

export const DownloadButton = styled.TouchableOpacity`
  z-index: 1;
`;

export const DownloadIcon = styled(Icon)`
  color: ${({theme}) => theme.text.primary};
  font-size: 20px;
`;

export const FillerContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  background: ${({theme}) => theme.base.mainColor};
  width: 75px;
  height: 22px;
  border-bottom-right-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const FillerText = styled(Text)`
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 15px;
`;
