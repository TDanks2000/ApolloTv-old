import {Container, MiddleText} from './MiddleOfScreenText.styles';

type Props = {
  text: string;
  numberOfLines?: number;
};

const MiddleOfScreenTextComponent = ({text, numberOfLines = 1}: Props) => {
  return (
    <Container>
      <MiddleText numberOfLines={numberOfLines}>{text}</MiddleText>
    </Container>
  );
};

export default MiddleOfScreenTextComponent;
