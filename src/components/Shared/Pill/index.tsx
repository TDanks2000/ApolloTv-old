import {View, Text} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {PillContainer, PillTitle} from './Pill.styles';

type Props = {
  title: string;
  onPress?: () => void;
  active: boolean;
  disabled?: boolean;
};

const PillComponent: React.FC<PropsWithChildren<Props>> = ({
  children,
  title,
  onPress,
  active,
  disabled,
}) => {
  return (
    <PillContainer active={active} disabled={disabled} onPress={onPress}>
      <PillTitle>{title}</PillTitle>
      {children}
    </PillContainer>
  );
};

export default PillComponent;
