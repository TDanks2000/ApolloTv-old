export type AlertTypes = 'error' | 'success' | 'info' | 'warning' | 'default';
export type AlertOptionStyle = 'cacnel' | 'confirm' | 'default';
export type AlertOptions = {
  text: string;
  onPress: () => void;
  style: AlertOptionStyle;
};

export type AlertShowTrueState = {
  show: true;
  title: string;
  message: string;
  icon?: string | React.Component;
  type: AlertTypes;
  duration?: number;
  options?: AlertOptions[];
};

export type AlertState = {
  show: boolean;
} & (AlertShowTrueState | {show: false});

export type AlertExtraParams = {
  icon?: string;
  duration?: number;
  type?: AlertTypes;
  options?: AlertOptions[];
};
