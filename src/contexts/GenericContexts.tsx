import React, {Context} from 'react';
import {EpisodeInfo} from '../@types';
import {settingsHelper} from '../utils';
import {AlertExtraParams, AlertState, AlertTypes} from '../@types/Alert.types';

type ContextOptions = {
  alertState: AlertState;
  openAlert: (
    title: string,
    message: string,
    type: AlertTypes,
    options?: AlertExtraParams,
  ) => void;
  closeAlert: () => void;
};

export const GenericContext = React.createContext<ContextOptions | null>(null);

export const GenericContextProvider = ({children}: any) => {
  const [alertState, setAlertState] = React.useState<AlertState>({
    show: false,
  });

  const openAlert = (
    title: string,
    message: string,
    type: AlertTypes,
    options?: AlertExtraParams,
  ) => {
    setAlertState({
      show: true,
      title,
      message,
      icon: options?.icon,
      type: type || 'default',
      duration: options?.duration,
      options: options?.options || [],
    });
  };

  const closeAlert = () => {
    setAlertState({
      show: false,
    });
  };

  return (
    <GenericContext.Provider
      value={{
        alertState,
        openAlert,
        closeAlert,
      }}>
      {children}
    </GenericContext.Provider>
  );
};
