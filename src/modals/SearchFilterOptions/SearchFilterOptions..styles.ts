import styled from 'styled-components/native';
import {Text} from '../../styles/sharedStyles';
import {rgba} from 'polished';

export const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  padding: 55px 35px;
`;

export const Container = styled.Pressable`
  flex: 1;
  background-color: black;
  border-radius: 10px;
  padding: 15px;
  gap: 15px;
  overflow: hidden;
`;

export const FilterTypeContainer = styled.View``;

export const FilterTypeText = styled(Text)`
  margin-bottom: 15px;
`;

export const Title = styled(Text)`
  margin-bottom: 5px;
  font-size: 19px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
`;

export const Seperator = styled.View`
  margin-bottom: 10px;
  background-color: ${({theme}) => rgba(theme.text.secondary, 0.35)};
  width: 100%;
  height: 1px;
`;
