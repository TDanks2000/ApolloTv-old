import {View, Text, Modal, Animated, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  SettingsOptionsGroup,
  SettingsSectionsType,
  SourceVideoOptions,
} from '../../@types';
import {Container, SettingsIconLeft} from './Settings.shared.styles';
import {
  SettingsContainer,
  SettingsWrapper,
  TopContainer,
  TopTitle,
} from './Settings.styles';
import SettingsSection from './SettingSection';
import SettingsSections from './SettingsSections';

type Props = {
  shouldOpen: boolean;

  selectedQuality: SourceVideoOptions;
  options: SettingsOptionsGroup[];

  closeFunction: () => void;
};

const VideoSettingsModal = ({
  options,
  selectedQuality,
  shouldOpen,
  closeFunction,
}: Props) => {
  const [selectedSetting, setSelectedSetting] = React.useState<
    string | undefined
  >();

  const findSelectedSetting = (): SettingsOptionsGroup => {
    const selectedSection = options.find(
      option => option.title.toLowerCase() === selectedSetting?.toLowerCase(),
    );

    return selectedSection as SettingsOptionsGroup;
  };

  const sections: SettingsSectionsType[] = [
    {
      name: 'Quality',
      value: 'quality',
      iconName: 'sliders-h',
      selectedOption: selectedQuality.quality,
    },
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
      onRequestClose={closeFunction}>
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
