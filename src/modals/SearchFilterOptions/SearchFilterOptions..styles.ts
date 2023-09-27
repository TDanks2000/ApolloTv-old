import styled from 'styled-components/native';
import {Text} from '../../styles/sharedStyles';

export const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  padding: 45px 30px;
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
