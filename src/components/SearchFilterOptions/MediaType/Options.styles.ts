import {styled} from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';
import {rgba} from 'polished';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    gap: 10,
  },
})`
  width: 100%;
  height: 40px;
`;
