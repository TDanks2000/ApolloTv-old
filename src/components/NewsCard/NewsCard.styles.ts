import styled from 'styled-components/native';
import {Text} from '../../styles/sharedStyles';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 255px;
  position: relative;
`;

export const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 160px;
  border-radius: 8px;
  overflow: hidden;
`;

export const Topic = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px;
  border-bottom-right-radius: 8px;
  background: rgba(0, 0, 0, 1);
  z-index: 1;
`;

export const TopicText = styled(Text)`
  text-transform: capitalize;
`;

export const BottomInfo = styled.View`
  flex-direction: column;
  margin-top: 8px;
  gap: 3px;
`;

export const Title = styled(Text)`
  font-size: 15px;
`;

export const Description = styled(Text)`
  font-size: 13px;
  color: ${({theme}) => theme.text.secondary};
`;
