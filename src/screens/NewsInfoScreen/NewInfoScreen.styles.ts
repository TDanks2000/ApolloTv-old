import styled from 'styled-components/native';
import {Text} from '../../styles/sharedStyles';

export const Container = styled.View``;

export const TopContainer = styled.View`
  flex-direction: row;
  gap: 15px;
  height: 220px;
`;

export const Image = styled.Image`
  width: 125px;
  height: 100%;

  border-radius: 8px;
  overflow: hidden;
`;

export const Info = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  gap: 2px;
`;

export const MetaInfo = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  flex: 1;

  gap: 5px;
`;

export const Title = styled(Text)`
  width: 100%;
  font-size: 16px;
`;

export const DateText = styled(Text)`
  width: 100%;
  font-size: 14px;
  color: ${({theme}) => theme.text.secondary};
`;

export const Description = styled(Text)`
  width: 100%;
  margin-top: 20px;
  font-size: 15px;
`;
