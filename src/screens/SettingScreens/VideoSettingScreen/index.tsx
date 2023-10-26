import React from 'react';
import {ScrollView, SharedContainer, Title} from '../../../styles/sharedStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextContainer} from '../SettingScreens.styles';
import {BackButtonComponent, Settings} from '../../../components';
import {Seperator} from '../../../styles/settings.shared.styles';
import {SettingsContext} from '../../../contexts';
import {Quality} from '../../../@types';

const VideoSettingScreen = () => {
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
    <SafeAreaView>
      <SharedContainer>
        <TextContainer>
          <BackButtonComponent isModal={false} />
          <Title>Video Settings</Title>
        </TextContainer>

        <ScrollView style={{paddingTop: 30, marginTop: 15}}>
          <Settings.Setting
            title="Auto Skip Intro"
            descriptor="Auto skip the opening intro"
            selectedOption={autoSkipIntro ?? 'off'}
            onPress={() =>
              changeAutoSkip ? changeAutoSkip('auto_skip_intro') : undefined
            }
          />
          <Seperator />
          <Settings.Setting
            title="Auto Skip Outro"
            descriptor="Auto skip the ending outro"
            selectedOption={autoSkipOutro ?? 'off'}
            onPress={() =>
              changeAutoSkip ? changeAutoSkip('auto_skip_outro') : undefined
            }
          />

          <Seperator />

          <Settings.Setting
            title="Auto Next Episode"
            descriptor="Auto play the next Episode"
            selectedOption={autoNextEpisode ?? 'off'}
            onPress={() =>
              changeAutoNextEpisode
                ? changeAutoNextEpisode('auto_next_episode')
                : undefined
            }
          />

          <Seperator />

          <Settings.Setting
            title="Preferred Quality"
            descriptor="What Quality would you like to be auto selected"
            selectedOption={preferedQuality ?? 'HIGEST'}
            dropdown={true}
            options={qualityOptions}
            changeSetting={changePreferedQuality}
          />

          <Seperator />

          <Settings.Setting
            title="Skip Forward Time"
            descriptor="change the skip forawrd time"
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
            title="Rewind Time"
            descriptor="change the rewind time"
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
            title="Play in background"
            descriptor="Continue playing while the app is in the background."
            selectedOption={playInBackground ?? 'off'}
            onPress={() =>
              changePlayInBackground ? changePlayInBackground() : undefined
            }
          />

          <Seperator />

          <Settings.Setting
            title="Play when inactive"
            descriptor="Continue playing when notifications are in front of the video"
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
