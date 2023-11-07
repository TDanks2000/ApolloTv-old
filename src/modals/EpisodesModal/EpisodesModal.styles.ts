import {rgba} from 'polished';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styled} from 'styled-components/native';
import {Text} from '../../styles/sharedStyles';

export const Container = styled.View`
  padding: ${({theme}) => theme.spacing.paddingLeft};
`;

export const TopContainer = styled.View`
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
  flex: 1;
  padding-right: ${({theme}) => theme.spacing.paddingRight};
  color: white;
  font-size: 20px;

  font-weight: bold;
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
`;

export const EpisodesWrapper = styled.View`
  gap: 20px;
`;

export const Options = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

type Props = {
  active?: boolean;
};

export const Option = styled.TouchableOpacity<Props>`
  overflow: hidden;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;

  border-radius: 20px;
  padding: 8px 15px;
  background: ${({theme}) => rgba(theme.text.offWhite, 0.09)};
  background: ${({active, theme}) =>
    active ? rgba(theme.base.mainColor, 0.2) : rgba(theme.text.offWhite, 0.09)};
`;

export const OptionText = styled(Text)`
  color: ${({theme}) => theme.text.primary};
  text-transform: uppercase;
  font-size: 14px;
`;
