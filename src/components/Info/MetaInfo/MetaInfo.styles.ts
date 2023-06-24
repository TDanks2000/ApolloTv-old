import {styled} from 'styled-components/native';

export const Container = styled.View`
  padding: 0 ${({theme}) => theme.spacing.paddingLeft};
  margin-bottom: ${({theme}) => theme.spacing.paddingBottom};
`;

export const Wrapper = styled.View`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 7px;
`;

export const TopMetaInfo = styled.View`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const Seperator = styled.View`
  width: 0.2px;
  height: 70%;
  background-color: ${({theme}) => theme.text.secondary};
`;

export const Text = styled.Text`
  font-size: 13px;
  color: ${({theme}) => theme.text.secondary};
  font-family: ${({theme}) => theme.text.fonts.openSans.regular};
`;

export const Title = styled.Text`
  font-size: 23px;
  color: ${({theme}) => theme.text.primary};
  font-family: ${({theme}) => theme.text.fonts.openSans.bold};
`;

export const BottomMetaInfo = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const BottomMetaInfoItem = styled.View`
  padding: 5px 15px;
  background: ${({theme}) => theme.base.offDarkBg};
  border-radius: 50px;
`;

interface IAltText {
  bold?: boolean;
}

export const AltText = styled(Text)<IAltText>`
  font-size: 14px;
  color: white;
  font-weight: ${({bold}) => (bold ? 'bold' : 'normal')};
`;
