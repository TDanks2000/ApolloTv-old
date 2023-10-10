import React from 'react';

import {State, TapGestureHandler} from 'react-native-gesture-handler';

type Props = {
  numberOfTaps: number;
  tapFunction: () => void;
  singleTapFunction: () => void;
  children: React.ReactNode;
};

const TapGesture: React.FC<Props> = ({
  children,
  numberOfTaps,
  tapFunction,
  singleTapFunction,
}) => {
  const doubleTapRef = React.useRef(null);

  const onSingleTapEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      singleTapFunction();
    }
  };

  const onDoubleTapEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      tapFunction();
    }
  };

  return (
    <TapGestureHandler
      onHandlerStateChange={onSingleTapEvent}
      waitFor={doubleTapRef}
      maxDelayMs={10}>
      <TapGestureHandler
        ref={doubleTapRef}
        onHandlerStateChange={onDoubleTapEvent}
        numberOfTaps={2}>
        {children}
      </TapGestureHandler>
    </TapGestureHandler>
  );
};
export default TapGesture;
