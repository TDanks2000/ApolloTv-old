import {useTranslation} from 'react-i18next';
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
  const {t} = useTranslation();

  return (
    <WatchNowButton onPress={onPress}>
      {/* @ts-ignore */}
      <WatchNowIcon />
      <WatchNowButtonText>
        {WatchText ? WatchText : t('watch_now')}
      </WatchNowButtonText>
    </WatchNowButton>
  );
};

export default WatchNowComponent;
