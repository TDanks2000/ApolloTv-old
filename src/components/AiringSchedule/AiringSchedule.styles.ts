import {styled} from 'styled-components/native';
import {Text, SharedContainer} from '../../styles/sharedStyles';

export const Container = styled(SharedContainer)`
  margin-top: 5px;
`;

type Props = {
  active?: boolean;
};

export const DateView = styled.TouchableOpacity<Props>`
  flex-direction: column;
  padding: 10px;
  ${({active, theme}) =>
    active &&
    `
    border-color: ${theme.base.mainColor};
    border-bottom-width: 2px;
    `}
`;

export const DayMonthText = styled(Text)`
  text-transform: uppercase;
  font-size: 16px;
  letter-spacing: 1px;
`;

export const DayOfWeekText = styled(Text)`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 2px;
`;

export const DaysContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    gap: 10,
    paddingHorizontal: 20,
  },
})``;

export const AnimesContainer = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    gap: 8,
  },
})`
  width: 100%;
  /* height: 345px; */
  margin-top: 20px;
  overflow: hidden;
`;

export const AnimeContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
  overflow: hidden;
`;

export const AnimeTime = styled(Text)`
  font-weight: bold;
  overflow: hidden;
  /* color: ${({theme}) => theme.base.mainColor}; */
`;

export const AnimeTitle = styled(Text).attrs({
  numberOfLines: 1,
})`
  flex: 1;
  overflow: hidden;
  font-size: 14px;
`;
