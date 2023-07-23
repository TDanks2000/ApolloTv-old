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
} from '../VideoSettingsModal.shared.styles';
import {SettingsSectionsType, SourceVideoOptions} from '../../../@types';
import {Option} from '../../../components';
import {settingsHelper} from '../../../utils';

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
    const SectionComponent = () => {
      if (item.optionType === 'option' && item.options && item.onPress) {
        return (
          <React.Fragment key={`settings-option-${item.value}`}>
            {item?.iconName ? <SectionIcon name={item.iconName} /> : null}
            <SectionTitle>{item.name}</SectionTitle>
            <SectionRight>
              <Option
                option={item.selectedOption}
                options={item.options}
                setOption={item.setOption ?? undefined}
                onPress={item.onPress}
                size="sm"
              />
            </SectionRight>
          </React.Fragment>
        );
      }

      return (
        <React.Fragment key={`settings-option-${item.value}`}>
          {item?.iconName ? <SectionIcon name={item.iconName} /> : null}
          <SectionTitle>{item.name}</SectionTitle>
          <SectionRight>
            <SelectedOption>{item.selectedOption}</SelectedOption>
            {/* @ts-ignore */}
            {item.hasSubOptions ? <SettingsIconRight /> : null}
          </SectionRight>
        </React.Fragment>
      );
    };

    return (
      <Section onPress={() => setSelectedSetting(item.value)}>
        <SectionComponent />
      </Section>
    );
  };

  return (
    <FlatList
      horizontal={false}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      data={settingOptions}
      renderItem={({item}: {item: SettingsSectionsType}) => renderSection(item)}
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingVertical: 15,
        paddingBottom: 100,
        gap: 15,
      }}
    />
  );
};

export default SettingsSections;
