import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {
  Container,
  Section,
  SectionIcon,
  SectionRight,
  SectionSeperator,
  SectionTitle,
  SelectedOption,
  SettingsIconRight,
} from '../Settings.shared.styles';
import {SettingsSectionsType, SourceVideoOptions} from '../../../@types';

type Props = {
  selectedQuality: SourceVideoOptions;
  settingOptions: SettingsSectionsType[];

  selectedSetting: string | undefined;
  setSelectedSetting: (setting: string) => void;
};

const SettingsSections = ({
  selectedQuality,
  settingOptions,
  setSelectedSetting,
  selectedSetting,
}: Props) => {
  const renderSection = (item: SettingsSectionsType) => {
    const SectionComponent = () => (
      <>
        {item?.iconName ? <SectionIcon name={item.iconName} /> : null}
        <SectionTitle>{item.name}</SectionTitle>
        <SectionRight>
          <SelectedOption>{item.selectedOption}</SelectedOption>
          {/* @ts-ignore */}
          <SettingsIconRight />
        </SectionRight>
      </>
    );

    return (
      <Section onPress={() => setSelectedSetting(item.value)}>
        <SectionComponent />
      </Section>
    );
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={settingOptions}
      renderItem={({item}: {item: SettingsSectionsType}) => renderSection(item)}
      ItemSeparatorComponent={() => <View style={{height: 15}} />}
      contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 15}}
    />
  );
};

export default SettingsSections;
