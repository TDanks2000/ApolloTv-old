import {useContext, useEffect, useState} from 'react';
import {SettingsContext} from '../contexts';
import {UpdaterContext} from '../contexts/UpdaterContext';

const useCheckForUpdate = () => {
  const {autoUpdate} = useContext(SettingsContext);
  const {updater} = useContext(UpdaterContext);

  useEffect(() => {
    if (!autoUpdate) return;
    if (updater) updater.checkUpdate();
  }, []);
};

export default useCheckForUpdate;
