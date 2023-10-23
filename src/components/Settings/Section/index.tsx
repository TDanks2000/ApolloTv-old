import {
  Container,
  Description,
  LeftContainer,
  RightContainer,
  SelectedOption,
  Title,
  Wrapper,
} from '../Settings.styles';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../@types';

type SettingsSectionType =
  | 'navigation'
  | 'prefered_voice'
  | 'log_out'
  | 'check_for_update';

type Props = {
  title: string;
  descriptor: string;

  type: SettingsSectionType;
  selectedOption?: string;
} & (
  | {
      type: 'log_out' | 'check_for_update';
      onPress: () => void;
    }
  | {
      type: 'navigation';
      settingsScreen: keyof RootStackParamList;
    }
  | {
      type: 'prefered_voice';
      onPress: () => void;
    }
);

const Section = (props: Props) => {
  const navigation: any = useNavigation();
  const {title, descriptor} = props;
  const handlePress = () => {
    if (props.type === 'log_out' || props.type === 'prefered_voice')
      props.onPress();
    if (props.type === 'navigation') navigation.navigate(props.settingsScreen);
  };

  return (
    <Wrapper>
      <Container onPress={handlePress}>
        <LeftContainer>
          <Title>{title}</Title>
          <Description>{descriptor}</Description>
        </LeftContainer>
        <RightContainer>
          {props.selectedOption ? (
            <SelectedOption numberOfLines={1}>
              {props.selectedOption}
            </SelectedOption>
          ) : null}
        </RightContainer>
      </Container>
    </Wrapper>
  );
};

export default Section;
