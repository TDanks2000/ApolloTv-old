import {
  WatchNowButton,
  WatchNowButtonText,
  WatchNowIcon,
} from './WatchNow.styles';

interface Props {
  WatchText?: string;
  onPress?: () => void;
}

const WatchNowComponent = ({WatchText, onPress}: Props) => {
  return (
    <WatchNowButton onPress={onPress}>
      {/* @ts-ignore */}
      <WatchNowIcon />
      <WatchNowButtonText>
        {WatchText ? WatchText : ' Watch now'}
      </WatchNowButtonText>
    </WatchNowButton>
  );
};

export default WatchNowComponent;
