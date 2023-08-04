import {View, Text} from 'react-native';
import React from 'react';
import {Container} from './SourceSelector.styles';
import {DropdownData, sourceProviders} from '../../../@types';
import {Dropdown} from '../../Shared';
import {SettingsContext} from '../../../contexts';

const SourceSelector = () => {
  const {sourceProvider, changeSourceProvider} =
    React.useContext(SettingsContext);

  const Source_providers: DropdownData<string, sourceProviders>[] = [
    {
      label: 'gogoanime',
      value: 'gogoanime',
      image:
        'https://play-lh.googleusercontent.com/MaGEiAEhNHAJXcXKzqTNgxqRmhuKB1rCUgb15UrN_mWUNRnLpO5T1qja64oRasO7mn0',
    },
    {
      label: 'Zoro',
      value: 'zoro',
      image:
        'https://is3-ssl.mzstatic.com/image/thumb/Purple112/v4/7e/91/00/7e9100ee-2b62-0942-4cdc-e9b93252ce1c/source/512x512bb.jpg',
    },
    {
      label: 'AniWave',
      value: '9anime',
      image: 'https://s2.bunnycdn.ru/assets/sites/aniwave/favicon1.png',
    },

    {
      label: 'KickAssAnime',
      value: 'kickassanime',
      image: 'https://kickassanime.am/_nuxt/icons/icon_512x512.95dc24.png',
    },
  ];

  const onSelect = (item: DropdownData<string, sourceProviders>) => {
    if (!changeSourceProvider) return;
    changeSourceProvider(item.value);
  };

  const findSelected = Source_providers.find(
    item => item.value === sourceProvider,
  );

  return (
    <Container>
      <Dropdown
        label="Select Source"
        data={Source_providers}
        onSelect={onSelect}
        selectedProp={findSelected ?? Source_providers[0]}
      />
    </Container>
  );
};

export default SourceSelector;
