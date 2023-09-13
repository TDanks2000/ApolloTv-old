import React from 'react';
import {EpisodeInfo, Quality, sourceProviders} from '../@types';
import {settingsHelper} from '../utils';

export const SettingsContext = React.createContext<{
  autoSkipIntro?: string;
  autoSkipOutro?: string;
  autoNextEpisode?: string;
  preferedVoice?: string;
  preferedQuality?: Quality;
  sourceProvider?: sourceProviders;
  changeAutoSkip?: (setting: 'auto_skip_intro' | 'auto_skip_outro') => void;
  changePreferedVoice?: () => void;
  changePreferedQuality?: (quality: Quality) => void;
  changeSourceProvider?: (provider: sourceProviders) => void;
  changeAutoNextEpisode?: (setting: 'auto_next_episode') => void;
}>({});

export const useSettingsContext = React.useContext(SettingsContext);

export const SettingsProvider = ({children}: any) => {
  const autoSkipIntroSetting = settingsHelper.getSetting('auto_skip_intro');
  const autoSkipOutroSetting = settingsHelper.getSetting('auto_skip_outro');
  const autoNextEpisodeSetting = settingsHelper.getSetting('auto_next_episode');

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

  return (
    <SettingsContext.Provider
      value={{
        autoSkipIntro,
        autoSkipOutro,
        autoNextEpisode,
        preferedVoice,
        preferedQuality,
        sourceProvider,
        changeAutoSkip,
        changePreferedVoice,
        changePreferedQuality,
        changeSourceProvider,
        changeAutoNextEpisode,
      }}>
      {children}
    </SettingsContext.Provider>
  );
};
