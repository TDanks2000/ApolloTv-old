import {Settings} from '../@types';
import {storage} from './storage/cleint';

export const setSetting = (setting: Settings, value: any): void => {
  const settingName = `setting-${setting}`;

  console.log('setting', settingName, 'to', value.toString(), 'in storage');

  storage.set(settingName, value);
};

export const getSetting = <T>(setting: Settings): T => {
  const settingName = `setting-${setting}`;
  if (setting.includes('time')) {
    return storage.getNumber(settingName) as T;
  }
  return storage.getString(settingName) as T;
};
