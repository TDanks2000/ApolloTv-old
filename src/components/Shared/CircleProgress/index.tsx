import {Dimensions, View, TouchableOpacity, Text} from 'react-native';
import {Container, CircleProgressComponent} from './CircleProgress.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FC} from 'react';

type Props = {
  value: number;
  max_value: number;
  icon_name: string;
  radius?: number;
  duration?: number;
  clockwise?: boolean;
};

const CircleProgress: FC<Props> = ({
  value,
  max_value,
  radius = 15,
  duration = 2000,
  clockwise = true,
  icon_name,
}) => {
  return (
    <Container>
      <CircleProgressComponent
        value={value}
        radius={radius}
        duration={duration}
        maxValue={max_value}
        clockwise={clockwise}
        activeStrokeWidth={3}
        inActiveStrokeWidth={0}
        inActiveStrokeOpacity={0}>
        <Icon name={icon_name ?? 'download'} size={15} color="white" />
      </CircleProgressComponent>
    </Container>
  );
};

export default CircleProgress;
