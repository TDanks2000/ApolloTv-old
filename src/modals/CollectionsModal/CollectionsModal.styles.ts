import {styled} from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Wrapper = styled.View`
  width: 80%;
  height: 80%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
`;

export const TopBanner = styled.ImageBackground.attrs({
  resizeMode: 'cover',
})`
  height: 180px;
  width: 100%;
  background-color: red;
`;
