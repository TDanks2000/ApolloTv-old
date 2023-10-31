import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react';

import * as UpdateAPK from 'rn-update-apk';
import {HorizontalType, LayoutMode, OrientationType} from '../@types';

export const ReaderSettingsContext = createContext<{
  hideControls?: boolean;
  toggleControls?: React.DispatchWithoutAction;
  horizontalType?: HorizontalType;
  setHorizontalType?: React.Dispatch<React.SetStateAction<HorizontalType>>;
  layoutMode?: LayoutMode;
  setLayoutMode?: React.Dispatch<React.SetStateAction<LayoutMode>>;
  screenOrientation?: OrientationType | undefined;
  setScreenOrientation?: React.Dispatch<
    React.SetStateAction<OrientationType | undefined>
  >;
}>({});

export const ReaderSettingsProvider = ({children}: PropsWithChildren) => {
  const [hideControls, toggleControls] = React.useReducer(
    controls => !controls,
    true,
  );
  const [horizontalType, setHorizontalType] = React.useState<HorizontalType>(
    HorizontalType.disabled,
  );
  const [layoutMode, setLayoutMode] = React.useState<LayoutMode>(
    LayoutMode.Horizontal,
  );
  const [screenOrientation, setScreenOrientation] =
    React.useState<OrientationType>();

  return (
    <ReaderSettingsContext.Provider
      value={{
        hideControls,
        horizontalType,
        setHorizontalType,
        layoutMode,
        screenOrientation,
        setLayoutMode,
        setScreenOrientation,
        toggleControls,
      }}>
      {children}
    </ReaderSettingsContext.Provider>
  );
};
