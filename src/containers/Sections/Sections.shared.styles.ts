import Icon from 'react-native-vector-icons/FontAwesome5';
import {styled} from 'styled-components/native';

export const SectionContainer = styled.View`
  margin: 0 20px;
`;

export const SectionTitleContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: white;
`;

export const SectionTitleIcon = styled(Icon)`
  font-size: 15px;
  color: white;
`;
