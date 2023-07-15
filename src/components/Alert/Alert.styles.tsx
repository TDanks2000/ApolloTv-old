import {styled} from 'styled-components/native';
import {AlertTypes} from '../../@types/Alert.types';
import {Text} from '../../styles/sharedStyles';

export const Container = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 30px;

  background-color: rgba(0, 0, 0, 0.3);
`;

type AlertBoxProps = {
  AlertBoxType: AlertTypes;
};

export const AlertBox = styled.View<AlertBoxProps>`
  background: ${({theme}) => theme.base.offDarkBg};
  min-width: 200px;
  min-height: 100px;
  border-radius: 8px;
  overflow: hidden;
  border-left-width: 9px;

  ${({AlertBoxType, theme}) => {
    if (AlertBoxType === 'success')
      return `border-left-color: ${theme.text.success}`;
    if (AlertBoxType === 'error')
      return `border-left-color: ${theme.text.danger}`;
    if (AlertBoxType === 'warning')
      return `border-left-color: ${theme.text.warning}`;
    return `border-left-color: ${theme.base.mainColor}`;
  }};

  padding: 15px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Title = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  color: ${({theme}) => theme.text.primary};
`;

export const SubText = styled(Text)`
  font-size: 14px;
  color: ${({theme}) => theme.text.offWhite};
`;

export const Options = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
`;

export const Option = styled.TouchableOpacity``;

export const OptionText = styled(Text)``;
