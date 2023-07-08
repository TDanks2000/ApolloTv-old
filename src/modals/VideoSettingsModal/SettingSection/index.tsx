import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {
  Container,
  Section,
  SectionIcon,
  SectionRight,
  SectionTitle,
  SelectedOption,
} from '../Settings.shared.styles';
import {SettingsOptions, SettingsOptionsGroup} from '../../../@types';

type Props = {
  setSelectedSetting: (setting: string | undefined) => void;
} & SettingsOptionsGroup;

const SettingsSection = ({options, title, setSelectedSetting}: Props) => {
  const renderItem = (item: SettingsOptions) => {
    const SectionComponent = () => (
      <>
        <SectionTitle>{item.title}</SectionTitle>
      </>
    );

    return (
      <Section
        onPress={() => {
          item.onPress();
          setSelectedSetting(undefined);
        }}>
        <SectionComponent />
      </Section>
    );
  };

  if (!options) null;
  return (
    <FlatList
      horizontal={false}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      data={options as any[]}
      renderItem={({item}: {item: SettingsOptions}) => renderItem(item)}
      ItemSeparatorComponent={() => <View style={{height: 15}} />}
      contentContainerStyle={{
        paddingTop: 10,
        paddingBottom: 100,
        paddingHorizontal: 10,
      }}
    />
  );
};

export default SettingsSection;
