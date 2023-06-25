import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {styled} from 'styled-components/native';

const borderRadius = '35px';

export const Container = styled.View`
  width: 100%;
  height: 350px;
  border-bottom-left-radius: ${borderRadius};
  border-bottom-right-radius: ${borderRadius};
  overflow: hidden;
`;

export const ImageBackground = styled.ImageBackground.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Wrapper = styled(LinearGradient).attrs({
  colors: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.45)'],
  start: {x: 0, y: 0},
  end: {x: 0, y: 1},
})`
  width: 100%;
  height: 100%;
  padding: 15px 20px 25px 20px;
  flex-direction: column;
  justify-content: space-between;
`;

export const TopContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
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

export const BottomContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 3px;
`;

export const SeasonText = styled.Text`
  font-size: 15px;
  color: ${({theme}) => theme.text.offWhite};

  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
`;

export const TitleText = styled.Text`
  font-size: 23px;
  color: ${({theme}) => theme.text.primary};
  margin-bottom: 5px;

  font-weight: bold;
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
`;
