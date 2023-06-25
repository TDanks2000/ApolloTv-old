import Icon from 'react-native-vector-icons/FontAwesome';
import {rgba} from 'polished';
import {styled} from 'styled-components/native';

export const Container = styled.View`
  margin: 0 ${({theme}) => theme.spacing.paddingLeft};
  margin-top: ${({theme}) => theme.spacing.paddingTop};
  position: relative;
`;

export const Wrapper = styled.TouchableOpacity`
  position: relative;
  width: 100%;
  height: 45px;
  overflow: hidden;
  background-color: ${({theme}) => rgba(theme.base.mainColor, 0.4)};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  max-width: 400px;
`;

export const PercentWatched = styled.View`
  width: 50%;
  height: 100%;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${({theme}) => theme.base.mainColor};
`;

export const TextContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export const TextIcon = styled(Icon)`
  font-size: 17px;
  color: white;
`;

export const Text = styled.Text`
  font-size: 15px;
  color: white;
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
  text-transform: capitalize;
`;
