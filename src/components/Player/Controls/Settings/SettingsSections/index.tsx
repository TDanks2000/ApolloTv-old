import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {
  Section,
  SectionIcon,
  SectionSeperator,
  SectionTitle,
  SettingsIconRight,
} from './SettingsSections';

type Sections = {
  name: string;
  value: string;
  iconName: string;
};

const sections: Sections[] = [
  {
    name: 'Quality',
    value: 'quality',
    iconName: 'sliders-h',
  },
  {
    name: 'Quality',
    value: 'quality',
    iconName: 'sliders-h',
  },
];

const SettingsSections = () => {
  const renderSection = (item: Sections) => {
    console.log(item);

    const SectionComponent = () => (
      <>
        <SectionIcon name={item.iconName} />
        <SectionTitle>{item.name}</SectionTitle>
        {/* @ts-ignore */}
        <SettingsIconRight />
      </>
    );

    return (
      <Section onPress={() => console.log('pressed')}>
        <SectionComponent />
      </Section>
    );
  };

  return (
    <View>
      <FlatList
        data={sections}
        renderItem={({item}: {item: Sections}) => renderSection(item)}
        ItemSeparatorComponent={() => <SectionSeperator />}
      />
    </View>
  );
};

export default SettingsSections;
