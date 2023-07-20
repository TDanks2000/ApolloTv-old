import React from 'react';
import {EpisodeInfo, Quality} from '../@types';
import {settingsHelper} from '../utils';

export const SettingsContext = React.createContext<{
  autoSkipIntro?: string;
  autoSkipOutro?: string;
  preferedVoice?: string;
  preferedQuality?: Quality;
  changeAutoSkip?: (setting: 'auto_skip_intro' | 'auto_skip_outro') => void;
  changePreferedVoice?: () => void;
  changePreferedQuality?: (quality: Quality) => void;
}>({});

export const SettingsProvider = ({children}: any) => {
  const autoSkipIntroSetting = settingsHelper.getSetting('auto_skip_intro');
  const autoSkipOutroSetting = settingsHelper.getSetting('auto_skip_outro');
  const preferedVoiceSettings: any =
    settingsHelper.getSetting('prefered_voice');
  const preferedQualitySetting: any =
    settingsHelper.getSetting('prefered_quality');

  const [autoSkipIntro, setAutoSkipIntro] = React.useState(
    autoSkipIntroSetting ?? 'off',
  );
  const [autoSkipOutro, setAutoSkipOutro] = React.useState(
    autoSkipOutroSetting ?? 'off',
  );
  const [preferedVoice, setPreferedVoice] = React.useState<'sub' | 'dub'>(
    preferedVoiceSettings ?? 'sub',
  );
  const [preferedQuality, setPreferedQuality] = React.useState<Quality>(
    preferedQualitySetting ?? 'HIGHEST',
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

  return (
    <SettingsContext.Provider
      value={{
        autoSkipIntro,
        autoSkipOutro,
        preferedVoice,
        changeAutoSkip,
        changePreferedVoice,
        preferedQuality,
        changePreferedQuality,
      }}>
      {children}
    </SettingsContext.Provider>
  );
};
