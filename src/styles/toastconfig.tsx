import {BaseToastComponent, ErrorToast, InfoToast} from './toast';

import {ToastConfig} from 'react-native-toast-message';

export const toastConfig: ToastConfig = {
  success: props => <BaseToastComponent {...props} />,
  error: props => <ErrorToast {...props} />,
  info: props => <InfoToast {...props} />,
};
