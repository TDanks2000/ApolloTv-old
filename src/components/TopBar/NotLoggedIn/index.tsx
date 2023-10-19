import {Button, Container, ButtonText} from './NotLoggedIn.styles';
import {ANILIST_TOKEN_URL} from '@env';
import {Linking} from 'react-native';

const NotLoggedInComponent = () => {
  const onPress = () => {
    Linking.openURL(ANILIST_TOKEN_URL);
  };

  return (
    <Container>
      <Button onPress={onPress}>
        <ButtonText>Login</ButtonText>
      </Button>
    </Container>
  );
};

export default NotLoggedInComponent;
