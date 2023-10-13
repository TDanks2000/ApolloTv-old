import React from 'react';
import {Container} from './SourceSelector.styles';
import {ChangeSourceProvider} from '../../../containers';

const SourceSelector = () => {
  return (
    <Container>
      <ChangeSourceProvider width={'100%'} />
    </Container>
  );
};

export default SourceSelector;
