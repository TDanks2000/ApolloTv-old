import {Slider} from '@sharcoux/slider';
import {rgba} from 'polished';
import {css, styled} from 'styled-components/native';
import {Text} from '../../../styles/sharedStyles';

type Props = {
  show: boolean;
};

export const SliderContainer = styled.View<Props>`
  ${({show}) =>
    !show &&
    css`
      display: none;
    `}
  pointer-events: auto;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  padding: 5px 15px;
  border-radius: 9999px;
  z-index: 11;
`;

export const SliderComponent = styled(Slider).attrs(({theme}) => ({
  thumbTintColor: theme.base.mainColor,
  maximumTrackTintColor: rgba(theme.base.mainColor, 0.4),
  minimumTrackTintColor: rgba(theme.base.mainColor, 0.9),
  trackHeight: 5,
  thumbSize: 15,
}))`
  position: relative;
  width: 100%;
  z-index: 13;
`;
