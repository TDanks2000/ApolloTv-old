import {styled} from 'styled-components/native';
import {Text} from '../../styles/sharedStyles';

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
`;

export const DayOfWeekText = styled(Text)`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 16px;
`;

export const DaysContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export const AnimesContainer = styled.View`
  width: 100%;
  gap: 10px;
  margin-top: 20px;
  overflow: hidden;
`;

export const AnimeContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
  overflow: hidden;
`;

export const AnimeTime = styled(Text)`
  overflow: hidden;
`;
export const AnimeTitle = styled(Text)`
  width: 100%;
  overflow: hidden;
`;
