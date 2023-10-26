import {useContext, useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {SettingsContext} from '../contexts';
import {addToAnalytics} from '../utils/api';
import {helpers} from '../utils';

const useCheckForUpdate = () => {
  const {uuid, changeUUID} = useContext(SettingsContext);
  const {width} = useWindowDimensions();

  useEffect(() => {
    if (!uuid) {
      if (!changeUUID) return;

      const generateUUID: string = helpers.generateUUID();

      if (generateUUID?.length <= 0) return;

      changeUUID(generateUUID);
      addToAnalytics(width, generateUUID);
    } else {
      addToAnalytics(width, uuid);
    }
  }, []);
};

export default useCheckForUpdate;
