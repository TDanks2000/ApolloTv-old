import React from 'react';
import {Quality, mangaSourceProviders, sourceProviders} from '../@types';
import {settingsHelper, storage} from '../utils';

// Define a type for the 'on' and 'off' values.
type OnOrOff = 'on' | 'off';

// Create a React context to store and provide user settings.
export const SettingsContext = React.createContext<{
  autoSkipIntro?: OnOrOff;
  autoSkipOutro?: OnOrOff;
  autoNextEpisode?: OnOrOff;
  preferedVoice?: 'sub' | 'dub';
  preferedQuality?: Quality;
  sourceProvider?: sourceProviders;
  sourceProviderManga?: mangaSourceProviders;
  privateMode?: OnOrOff;
  skipForwardTime?: number;
  skipBehindTime?: number;
  autoUpdate?: boolean;
  playInBackground?: OnOrOff;
  playWhenInactive?: OnOrOff;
  changeAutoSkip?: (setting: 'auto_skip_intro' | 'auto_skip_outro') => void;
  changePreferedVoice?: () => void;
  changePreferedQuality?: (quality: Quality) => void;
  changeSourceProvider?: (
    provider: sourceProviders,
    type?: 'ANIME' | 'MANGA',
  ) => void;
  changeAutoNextEpisode?: (setting: 'auto_next_episode') => void;
  changePrivateMode?: () => void;
  changeSkipTime?: (
    setting: 'skip_forward_time' | 'skip_behind_time',
    time: number,
  ) => void;
  changeAutoUpdate?: (setting: boolean) => void;
  uuid?: string;
  changeUUID?: (uuid: string) => void;
  changePlayInBackground?: () => void;
  changePlayWhenInactive?: () => void;
}>({});

// Create a custom hook for using the SettingsContext.
export const useSettingsContext = React.useContext(SettingsContext);

// Define a React component for providing and managing user settings.
export const SettingsProvider = ({children}: any) => {
  // Retrieve settings from local storage or use default values.
  const autoSkipIntroSetting = settingsHelper.getSetting<OnOrOff | undefined>(
    'auto_skip_intro',
  );
  const autoSkipOutroSetting = settingsHelper.getSetting<OnOrOff | undefined>(
    'auto_skip_outro',
  );
  const autoNextEpisodeSetting = settingsHelper.getSetting<OnOrOff | undefined>(
    'auto_next_episode',
  );
  const privateModeSetting = settingsHelper.getSetting<OnOrOff | undefined>(
    'private_mode',
  );
  const autoUpdateSetting = settingsHelper.getSetting<boolean | undefined>(
    'auto_update',
  );
  const skipForwardSetting =
    settingsHelper.getSetting<number>('skip_forward_time');
  const skipBehindSetting =
    settingsHelper.getSetting<number>('skip_behind_time');
  const preferedVoiceSettings: any =
    settingsHelper.getSetting('prefered_voice');
  const preferedQualitySetting: any =
    settingsHelper.getSetting('prefered_quality');
  const sourceProviderSetting = settingsHelper.getSetting(
    'source_provider',
  ) as sourceProviders;
  const sourceProviderSettingManga = settingsHelper.getSetting(
    'source_provider_manga',
  ) as mangaSourceProviders;

  const playInBackgroundSetting = settingsHelper.getSetting(
    'play_in_background',
  ) as OnOrOff;

  const playWhenInactiveSetting = settingsHelper.getSetting(
    'play_when_inactive',
  ) as OnOrOff;

  // Retrieve and set UUID from local storage.
  const uuidStorage = storage.getString('device-uuid');

  // Initialize state variables for user settings.
  const [autoSkipIntro, setAutoSkipIntro] = React.useState(
    autoSkipIntroSetting ?? 'off',
  );
  const [autoSkipOutro, setAutoSkipOutro] = React.useState(
    autoSkipOutroSetting ?? 'off',
  );
  const [autoNextEpisode, setAutoNextEpisode] = React.useState(
    autoNextEpisodeSetting ?? 'off',
  );
  const [preferedVoice, setPreferedVoice] = React.useState<'sub' | 'dub'>(
    preferedVoiceSettings ?? 'sub',
  );
  const [preferedQuality, setPreferedQuality] = React.useState<Quality>(
    preferedQualitySetting ?? 'HIGHEST',
  );
  const [sourceProvider, setSourceprovider] = React.useState<sourceProviders>(
    sourceProviderSetting ?? 'gogoanime',
  );
  const [sourceProviderManga, setSourceproviderManga] =
    React.useState<mangaSourceProviders>(
      sourceProviderSettingManga ?? 'mangadex',
    );
  const [privateMode, setPrivateMode] = React.useState(
    privateModeSetting ?? 'off',
  );
  const [skipForwardTime, setSkipForwardTime] = React.useState<number>(
    skipForwardSetting ?? 30,
  );
  const [skipBehindTime, setSkipBehindTime] = React.useState<number>(
    skipBehindSetting ?? 30,
  );
  const [autoUpdate, setAutoUpdate] = React.useState<boolean>(
    autoUpdateSetting ?? false,
  );
  const [uuid, setUuid] = React.useState<string | undefined>(
    uuidStorage ?? undefined,
  );
  const [playInBackground, setPlayInBackground] = React.useState<OnOrOff>(
    playInBackgroundSetting ?? 'off',
  );
  const [playWhenInactive, setPlayWhenInactive] = React.useState<OnOrOff>(
    playWhenInactiveSetting ?? 'on',
  );

  // Define functions for changing user settings.
  const changeAutoSkip = (setting: 'auto_skip_intro' | 'auto_skip_outro') => {
    if (setting === 'auto_skip_intro') {
      settingsHelper.setSetting(setting, autoSkipIntro === 'on' ? 'off' : 'on');
      setAutoSkipIntro(prev => (prev === 'on' ? 'off' : 'on'));
    } else {
      setAutoSkipOutro(prev => (prev === 'on' ? 'off' : 'on'));
      settingsHelper.setSetting(setting, autoSkipOutro === 'on' ? 'off' : 'on');
    }
  };

  const changeAutoNextEpisode = (setting: 'auto_next_episode') => {
    settingsHelper.setSetting(setting, autoNextEpisode === 'on' ? 'off' : 'on');
    setAutoNextEpisode(prev => (prev === 'on' ? 'off' : 'on'));
  };

  const changePreferedVoice = () => {
    settingsHelper.setSetting(
      'prefered_voice',
      preferedVoice === 'sub' ? 'dub' : 'sub',
    );
    setPreferedVoice(prev => (prev === 'sub' ? 'dub' : 'sub'));
  };

  const changePreferedQuality = (quality: Quality) => {
    settingsHelper.setSetting('prefered_quality', quality);
    setPreferedQuality(quality);
  };

  const changeSourceProvider = (
    provider: sourceProviders | mangaSourceProviders,
    type: 'MANGA' | 'ANIME' = 'ANIME',
  ) => {
    switch (type) {
      case 'ANIME':
        settingsHelper.setSetting('source_provider', provider);
        setSourceprovider(provider as sourceProviders);
        break;
      case 'MANGA':
        settingsHelper.setSetting('source_provider_manga', provider);
        setSourceproviderManga(provider as mangaSourceProviders);
        break;
      default:
        break;
    }
  };

  const changePrivateMode = () => {
    settingsHelper.setSetting(
      'private_mode',
      privateMode === 'off' ? 'on' : 'off',
    );
    setPrivateMode(prev => (prev === 'off' ? 'on' : 'off'));
  };

  const changeSkipTime = (
    settingSkip: 'skip_forward_time' | 'skip_behind_time',
    time: number,
  ) => {
    settingsHelper.setSetting(settingSkip, time);
    if (settingSkip === 'skip_behind_time') setSkipBehindTime(time);
    if (settingSkip === 'skip_forward_time') setSkipForwardTime(time);
  };

  const changeAutoUpdate = (setting: boolean) => {
    settingsHelper.setSetting('auto_update', setting);
    setAutoUpdate(setting);
  };

  const changeUUID = (uuid: string) => {
    setUuid(uuid);
    storage.set('device-uuid', uuid);
  };

  const changePlayInBackground = () => {
    settingsHelper.setSetting(
      'play_in_background',
      playInBackground === 'off' ? 'on' : 'off',
    );
    setPlayInBackground(prev => (prev === 'off' ? 'on' : 'off'));
  };

  const changePlayWhenInactive = () => {
    settingsHelper.setSetting(
      'play_when_inactive',
      playWhenInactive === 'off' ? 'on' : 'off',
    );
    setPlayWhenInactive(prev => (prev === 'off' ? 'on' : 'off'));
  };

  // Return the SettingsContext.Provider with the state and update functions.
  return (
    <SettingsContext.Provider
      value={{
        autoSkipIntro,
        autoSkipOutro,
        autoNextEpisode,
        preferedVoice,
        preferedQuality,
        sourceProvider,
        sourceProviderManga,
        privateMode,
        skipBehindTime,
        skipForwardTime,
        autoUpdate,
        changeAutoSkip,
        changePreferedVoice,
        changePreferedQuality,
        changeSourceProvider,
        changeAutoNextEpisode,
        changePrivateMode,
        changeSkipTime: changeSkipTime,
        changeAutoUpdate,
        uuid,
        changeUUID,
        playInBackground,
        changePlayInBackground,
        playWhenInactive,
        changePlayWhenInactive,
      }}>
      {children}
    </SettingsContext.Provider>
  );
};
