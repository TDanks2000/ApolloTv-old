import {Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  ResizeOptions,
  SettingsOptionsGroup,
  SettingsSectionsType,
  SourceVideoOptions,
} from '../../@types';
import {SettingsIconLeft} from './VideoSettingsModal.shared.styles';
import {
  SettingsContainer,
  SettingsWrapper,
  TopContainer,
  TopTitle,
} from './VideoSettingsModal.styles';
import SettingsSection from './SettingSection';
import SettingsSections from './SettingsSections';
import {SettingsContext} from '../../contexts';
import DeviceBrightness from '@adrianso/react-native-device-brightness';

type Props = {
  shouldOpen: boolean;
  resizeMode: ResizeOptions;
  setResizeMode: (resizeMode: ResizeOptions) => void;

  selectedQuality: SourceVideoOptions;
  options: SettingsOptionsGroup[];

  closeFunction: () => void;
};

const VideoSettingsModal = ({
  options,
  selectedQuality,
  shouldOpen,
  closeFunction,
  resizeMode,
  setResizeMode,
}: Props) => {
  const {
    autoSkipOutro,
    autoSkipIntro,
    changeAutoSkip,
    autoNextEpisode,
    changeAutoNextEpisode,
  } = React.useContext(SettingsContext);

  const [selectedSetting, setSelectedSetting] = React.useState<
    string | undefined
  >();
  const [brightness, setBrightness] = React.useState<number>(0);

  const getBrightness = async () => {
    const value = await DeviceBrightness.getSystemBrightnessLevel();
    setBrightness(value);
  };

  React.useEffect(() => {
    getBrightness();
  }, []);
  React.useEffect(() => {
    console.log(resizeMode);
  }, [resizeMode]);

  const findSelectedSetting = (): SettingsOptionsGroup => {
    const selectedSection = options.find(
      option => option.title.toLowerCase() === selectedSetting?.toLowerCase(),
    );

    return selectedSection as SettingsOptionsGroup;
  };

  const handleResizeOptions = () => {
    const resizeOptions: ResizeOptions[] = [
      'contain',
      'stretch',
      'cover',
      'none',
    ];
    const currentResizeModeIndex = resizeOptions.indexOf(resizeMode);
    const nextResizeModeIndex = currentResizeModeIndex + 1;
    if (nextResizeModeIndex >= resizeOptions.length) {
      setResizeMode(resizeOptions[0]);
    } else {
      setResizeMode(resizeOptions[nextResizeModeIndex]);
    }
  };

  const sections: SettingsSectionsType[] = [
    {
      name: 'Quality',
      value: 'quality',
      iconName: 'sliders-h',
      selectedOption: selectedQuality.quality,
      hasSubOptions: true,
      optionType: 'subOption',
    },
    {
      name: 'Resize Mode',
      value: 'resize_mode',
      iconName: 'arrows-alt',
      selectedOption: resizeMode?.toString()!,
      hasSubOptions: false,
      optionType: 'pressable',
      onPress: handleResizeOptions,
    },
    {
      name: 'Auto Skip Intro',
      value: 'auto_skip_intro',
      iconName: 'step-forward',
      selectedOption: autoSkipIntro === 'on' ? 'on' : 'off',
      hasSubOptions: false,
      optionType: 'option',
      setOption: undefined,
      onPress: () => {
        if (changeAutoSkip) changeAutoSkip('auto_skip_intro');
      },
      options: [
        {
          label: 'On',
          value: 'on',
        },
        {
          label: 'Off',
          value: 'off',
        },
      ],
    },
    {
      name: 'Auto Skip Outro',
      value: 'auto_skip_outro',
      iconName: 'step-forward',
      selectedOption: autoSkipOutro === 'on' ? 'on' : 'off',
      hasSubOptions: false,
      optionType: 'option',
      setOption: undefined,
      onPress: () => {
        if (changeAutoSkip) changeAutoSkip('auto_skip_outro');
      },
      options: [
        {
          label: 'On',
          value: 'on',
        },
        {
          label: 'Off',
          value: 'off',
        },
      ],
    },
    {
      name: 'Auto Next Episode',
      value: 'auto_next_episode',
      iconName: 'forward',
      selectedOption: autoNextEpisode === 'on' ? 'on' : 'off',
      hasSubOptions: false,
      optionType: 'option',
      setOption: undefined,
      onPress: () => {
        if (changeAutoNextEpisode) changeAutoNextEpisode('auto_next_episode');
      },
      options: [
        {
          label: 'On',
          value: 'on',
        },
        {
          label: 'Off',
          value: 'off',
        },
      ],
    },
    // {
    //   name: 'Brightness',
    //   value: 'brightness',
    //   optionType: 'slider',
    //   iconName: 'moon',
    //   selectedOption: brightness.toString(),
    //   minValue: 0,
    //   maxValue: 1,
    //   hasSubOptions: false,
    // },
    // {
    //   name: 'Subtitles',
    //   value: 'subtitles',
    //   iconName: 'closed-captioning',
    //   selectedOption: '',
    // },
  ];

  return (
    <Modal
      visible={shouldOpen}
      transparent={true}
      onRequestClose={closeFunction}
      animationType="fade"
      hardwareAccelerated={true}>
      <TouchableOpacity onPress={closeFunction}>
        <SettingsContainer>
          <SettingsWrapper>
            <TopContainer>
              {findSelectedSetting()?.title ? (
                <TouchableOpacity onPress={() => setSelectedSetting(undefined)}>
                  {/* @ts-ignore */}
                  <SettingsIconLeft />
                </TouchableOpacity>
              ) : null}
              <TopTitle>{findSelectedSetting()?.title ?? 'Settings'}</TopTitle>
            </TopContainer>
            <SettingsWrapper>
              {selectedSetting && findSelectedSetting()?.title ? (
                <SettingsSection
                  {...findSelectedSetting()}
                  setSelectedSetting={setSelectedSetting}
                />
              ) : (
                <SettingsSections
                  selectedQuality={selectedQuality}
                  settingOptions={[...sections]}
                  selectedSetting={selectedSetting}
                  setSelectedSetting={setSelectedSetting}
                />
              )}
            </SettingsWrapper>
          </SettingsWrapper>
        </SettingsContainer>
      </TouchableOpacity>
    </Modal>
  );
};

export default VideoSettingsModal;
