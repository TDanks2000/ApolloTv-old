import React from 'react';
import {Container, Text} from './Description.styles';
import {utils} from '../../../utils';

interface Props {
  description: string;
}

const DescriptionComponent = ({description}: Props) => {
  const [showMore, setShowMore] = React.useState(false);

  const desc = utils.textSanitizer(description);

  return (
    <Container onPress={() => setShowMore(!showMore)} showMore={showMore}>
      <Text numberOfLines={showMore ? undefined : 5}>{desc}</Text>
    </Container>
  );
};

export default DescriptionComponent;
