import Icon from 'react-native-vector-icons/FontAwesome5';
import {styled} from 'styled-components/native';
import {Text} from '../../styles/sharedStyles';
import {rgba} from 'polished';

export const Container = styled.View`
  flex-direction: column;
  gap: 10px;
  margin: 15px 10px;

  width: 100%;
  height: 100%;
`;

export const SectionSeperator = styled.View`
  width: 100%;
  height: 3px;
  background: ${({theme}) => rgba(theme.text.secondary, 0.3)};
  margin: 15px 0;
  border-radius: 9998px;
  overflow: hidden;
`;

export const Section = styled.TouchableHighlight.attrs(({theme}) => ({
  activeOpacity: 0.8,
  underlayColor: rgba(theme.base.mainColor, 0.5),
}))`
  flex-direction: row;
  gap: 15px;
  justify-content: space-between;
  align-items: center;

  padding: 10px;
  border-radius: 10px;
`;

export const SectionRight = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export const SelectedOption = styled(Text).attrs({
  numberOfLines: 1,
})`
  margin-top: -3px;
  overflow: hidden;

  color: ${({theme}) => theme.text.secondary};
  text-transform: uppercase;
  font-size: 17px;
`;

export const SectionTitle = styled(Text)`
  font-size: 15px;
  flex: 1;
`;

export const SectionIcon = styled(Icon)`
  color: white;
  font-size: 16px;
  margin-bottom: -2px;
`;

export const SettingsIconRight = styled(SectionIcon).attrs({
  name: 'chevron-right',
})``;

export const SettingsIconLeft = styled(SectionIcon).attrs({
  name: 'chevron-left',
})``;
