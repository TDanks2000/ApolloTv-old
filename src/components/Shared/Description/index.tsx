import React from 'react';
import {Container, Text} from './Description.styles';

interface Props {
  description: string;
}

const DescriptionComponent = ({description}: Props) => {
  const [showMore, setShowMore] = React.useState(false);

  return (
    <Container onPress={() => setShowMore(!showMore)} showMore={showMore}>
      <Text numberOfLines={showMore ? undefined : 5}>{description}</Text>
    </Container>
  );
};

export default DescriptionComponent;
