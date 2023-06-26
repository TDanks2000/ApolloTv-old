import React from 'react';
import {Button, ButtonIcon} from '../Controls.styles';

interface Props {
  icon: string;
  duration: number;
}

const SkipTo = ({icon, duration}: Props) => {
  return (
    <Button>
      <ButtonIcon name={icon} />
    </Button>
  );
};

export default SkipTo;
