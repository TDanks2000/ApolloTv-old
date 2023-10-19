import {BackButtonIcon, BackButton} from './BackButton.styles';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation, UseStateType} from '../../../@types';

type SetVisibleType = UseStateType<boolean>;

interface Props {
  isModal: boolean;
  visible?: SetVisibleType[0];
  setVisible?: SetVisibleType[1];
}

const BackButtonComponent = ({isModal, setVisible, visible}: Props) => {
  const navigation = useNavigation<StackNavigation>();

  const goBack = () => {
    if (!isModal)
      return navigation.canGoBack()
        ? navigation.goBack()
        : navigation.navigate('Home', {});

    if (isModal && setVisible) return setVisible(prev => !prev);
  };

  return (
    <BackButton onPress={goBack}>
      <BackButtonIcon name="arrow-left" />
    </BackButton>
  );
};

export default BackButtonComponent;
