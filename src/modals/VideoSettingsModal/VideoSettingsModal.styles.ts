import {Animated} from 'react-native';
import {styled} from 'styled-components/native';
import {Text} from '../../styles/sharedStyles';
import {rgba} from 'polished';

export const SettingsContainer = styled(Animated.View)`
  width: 100%;
  max-height: 260px;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 45px 0;
  padding-right: 30px;
  z-index: 20;
`;

export const SettingsWrapper = styled.Pressable`
  width: 300px;
  max-height: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
`;

export const TopContainer = styled.View`
  flex-direction: row;
  gap: 20px;
  align-items: center;
  width: 100%;
  background: ${({theme}) => rgba(theme.base.mainColor, 0.6)};
  padding: 10px 15px;
`;

export const TopTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`;
