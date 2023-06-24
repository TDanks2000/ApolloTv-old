import {styled} from 'styled-components/native';

interface IDescriptionProps {
  showMore: boolean;
}

export const Container = styled.TouchableOpacity<IDescriptionProps>`
  padding: 0 ${({theme}) => theme.spacing.paddingLeft};
  height: ${({showMore}) => (showMore ? 'auto' : '100px')};
`;

export const Text = styled.Text`
  font-size: 15px;
  font-family: ${({theme}) => theme.text.fonts.openSans.regular};
  color: ${({theme}) => theme.text.offWhite};
`;
