import React, {useContext} from 'react';
import {ActionBarContext} from '../../contexts/ActionBarContext';
import {ActionBarText, Container} from './ActionBar.styles';

const ActionBar = () => {
  const {backgroundColor, show, title} = useContext(ActionBarContext);

  if (show !== true) return null;
  if (!title) return null;
  return (
    <Container backgroundColor={backgroundColor}>
      <ActionBarText>{title}</ActionBarText>
    </Container>
  );
};

export default ActionBar;
