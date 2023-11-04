import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, SharedContainer, Title} from '../../../styles/sharedStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextContainer} from '../SettingScreens.styles';
import {BackButtonComponent, Settings} from '../../../components';
import {Seperator} from '../../../styles/settings.shared.styles';
import {SettingsContext} from '../../../contexts';
import {Quality} from '../../../@types';

const VideoSettingScreen = () => {
  const {t} = useTranslation();

  const {
    autoSkipIntro,
    autoSkipOutro,
    autoNextEpisode,
    preferedQuality,
    skipBehindTime,
    skipForwardTime,
    changePreferedQuality,
    changeAutoSkip,
    changeAutoNextEpisode,
    changeSkipTime,
    playInBackground,
    playWhenInactive,
    changePlayInBackground,
    changePlayWhenInactive,
  } = React.useContext(SettingsContext);

  const qualityOptions: Quality[] = [
    'HIGHEST',
    '1080p',
    '720p',
    '480p',
    '360p',
    'LOWEST',
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <SharedContainer>
        <TextContainer>
          <BackButtonComponent isModal={false} />
          <Title>{t('settings_title_video')}</Title>
        </TextContainer>

        <ScrollView style={{paddingTop: 20, marginTop: 10, flex: 1}}>
          <Settings.Setting
            title={t('settings_setting_title_auto_skip_intro')}
            descriptor={t('settings_setting_auto_skip_intro_desc')}
            selectedOption={autoSkipIntro ?? 'off'}
            onPress={() =>
              changeAutoSkip ? changeAutoSkip('auto_skip_intro') : undefined
            }
          />
          <Seperator />
          <Settings.Setting
            title={t('settings_setting_title_auto_skip_outro')}
            descriptor={t('settings_setting_auto_skip_outro_desc')}
            selectedOption={autoSkipOutro ?? 'off'}
            onPress={() =>
              changeAutoSkip ? changeAutoSkip('auto_skip_outro') : undefined
            }
          />

          <Seperator />

          <Settings.Setting
            title={t('settings_setting_title_auto_next_episode')}
            descriptor={t('settings_setting_auto_next_episode_desc')}
            selectedOption={autoNextEpisode ?? 'off'}
            onPress={() =>
              changeAutoNextEpisode
                ? changeAutoNextEpisode('auto_next_episode')
                : undefined
            }
          />

          <Seperator />

          <Settings.Setting
            title={t('settings_setting_title_preferred_quality')}
            descriptor={t('settings_setting_preferred_quality_desc')}
            selectedOption={preferedQuality ?? 'HIGEST'}
            dropdown={true}
            options={qualityOptions}
            changeSetting={changePreferedQuality}
          />

          <Seperator />

          <Settings.Setting
            title={t('settings_setting_title_skip_forward_time')}
            descriptor={t('settings_setting_skip_forward_time_desc')}
            selectedOption={skipForwardTime ?? 30}
            typeOfSetting="input"
            changeSetting={(number: number) => {
              changeSkipTime
                ? changeSkipTime('skip_forward_time', number)
                : undefined;
            }}
          />

          <Seperator />

          <Settings.Setting
            title={t('settings_setting_title_rewind_time')}
            descriptor={t('settings_setting_rewind_time_desc')}
            selectedOption={skipBehindTime ?? 30}
            typeOfSetting="input"
            onPress={() => {}}
            changeSetting={(number: number) => {
              changeSkipTime
                ? changeSkipTime('skip_behind_time', number)
                : undefined;
            }}
          />

          <Seperator />

          <Settings.Setting
            title={t('settings_setting_title_play_in_background')}
            descriptor={t('settings_setting_play_in_background_desc')}
            selectedOption={playInBackground ?? 'off'}
            onPress={() =>
              changePlayInBackground ? changePlayInBackground() : undefined
            }
          />

          <Seperator />

          <Settings.Setting
            title={t('settings_setting_title_play_when_inactive')}
            descriptor={t('settings_setting_play_when_inactive_desc')}
            selectedOption={playWhenInactive ?? 'off'}
            onPress={() =>
              changePlayWhenInactive ? changePlayWhenInactive() : undefined
            }
          />

          <Seperator />
        </ScrollView>
      </SharedContainer>
    </SafeAreaView>
  );
};

export default VideoSettingScreen;
