import {View, Text} from 'react-native';
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
    changePreferedQuality,
    changeAutoSkip,
    changeAutoNextEpisode,
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
            title="Preferred Quality"
            descriptor="What Quality would you like to be auto selected"
            selectedOption={preferedQuality ?? 'HIGEST'}
            dropdown={true}
            options={qualityOptions}
            changeSetting={changePreferedQuality}
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
        </ScrollView>
      </SharedContainer>
    </SafeAreaView>
  );
};

export default VideoSettingScreen;
