import React from 'react';
import {EpisodeInfo, Quality, sourceProviders} from '../@types';
import {settingsHelper} from '../utils';

type OnOrOff = 'on' | 'off';

export const SettingsContext = React.createContext<{
  autoSkipIntro?: OnOrOff;
  autoSkipOutro?: OnOrOff;
  autoNextEpisode?: OnOrOff;
  preferedVoice?: 'sub' | 'dub';
  preferedQuality?: Quality;
  sourceProvider?: sourceProviders;
  privateMode?: OnOrOff;
  skipForwardTime?: number;
  skipBehindTime?: number;
  changeAutoSkip?: (setting: 'auto_skip_intro' | 'auto_skip_outro') => void;
  changePreferedVoice?: () => void;
  changePreferedQuality?: (quality: Quality) => void;
  changeSourceProvider?: (provider: sourceProviders) => void;
  changeAutoNextEpisode?: (setting: 'auto_next_episode') => void;
  changePrivateMode?: () => void;
  changeSkipTime?: (
    setting: 'skip_forward_time' | 'skip_behind_time',
    time: number,
  ) => void;
}>({});

export const useSettingsContext = React.useContext(SettingsContext);

export const SettingsProvider = ({children}: any) => {
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
  const [privateMode, setPrivateMode] = React.useState(
    privateModeSetting ?? 'off',
  );
  const [skipForwardTime, setSkipForwardTime] = React.useState<number>(
    skipForwardSetting ?? 30,
  );
  const [skipBehindTime, setSkipBehindTime] = React.useState<number>(
    skipBehindSetting ?? 30,
  );

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

  const changeSourceProvider = (provider: sourceProviders) => {
    settingsHelper.setSetting('source_provider', provider);
    setSourceprovider(provider);
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

  return (
    <SettingsContext.Provider
      value={{
        autoSkipIntro,
        autoSkipOutro,
        autoNextEpisode,
        preferedVoice,
        preferedQuality,
        sourceProvider,
        privateMode,
        skipBehindTime,
        skipForwardTime,
        changeAutoSkip,
        changePreferedVoice,
        changePreferedQuality,
        changeSourceProvider,
        changeAutoNextEpisode,
        changePrivateMode,
        changeSkipTime: changeSkipTime,
      }}>
      {children}
    </SettingsContext.Provider>
  );
};
