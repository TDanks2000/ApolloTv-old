import {View} from 'react-native';
import React, {PropsWithChildren, useEffect} from 'react';
import {
  Dropdown,
  MiddleOfScreenLoadingComponent,
  MiddleOfScreenTextComponent,
} from '../../components';
import {DropdownData} from '../../@types';
import {AiringSchedule} from '../../utils/TestData';

import {Circle, Svg} from 'react-native-svg';
import {api, helpers, utils} from '../../utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SharedContainer, Text} from '../../styles/sharedStyles';
import {SettingsContext} from '../../contexts';
import {useQuery} from '@tanstack/react-query';
import {API_BASE} from '@env';

type Props = {
  width: number | `${number}%`;
  type?: 'ANIME' | 'MANGA';
  refreshing?: boolean;
};

const ChangeSourceProvider: React.FC<PropsWithChildren<Props>> = ({
  width,
  type = 'ANIME',
  refreshing,
}) => {
  const {sourceProvider, changeSourceProvider, sourceProviderManga} =
    React.useContext(SettingsContext);

  type DataType = DropdownData<string, string>;
  const [selected, setSelected] = React.useState<DataType | undefined>(
    undefined,
  );

  const fetcher = async () => {
    const data = await api.fetcher<DataType[]>(
      `${API_BASE}/app/extensions/${type.toLowerCase()}`,
    );
    return data;
  };

  const {data, isError, error, isPending, refetch} = useQuery<DataType[]>({
    queryKey: ['sourceDropdown', type],
    queryFn: fetcher,
  });

  React.useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing]);

  if (isPending) return <MiddleOfScreenLoadingComponent />;
  if (isError)
    return (
      <MiddleOfScreenTextComponent
        text={error?.message ? error.message : 'There was an unexpected error!'}
      />
    );

  const findSelected = () => {
    if (!sourceProvider && type === 'ANIME')
      return data.find(val => val.label.toLowerCase().includes('gogo'));
    if (!sourceProviderManga && type === 'MANGA')
      return data.find(val => val.label.toLowerCase().includes('mangadex'));

    if (sourceProvider && type === 'ANIME')
      return data.find(val => val.label.toLowerCase().includes(sourceProvider));
    if (sourceProviderManga && type === 'MANGA')
      return data.find(val =>
        val.label.toLowerCase().includes(sourceProviderManga),
      );
    return undefined;
  };

  const onSelect = (item: any) => {
    setSelected(item);
    if (changeSourceProvider) changeSourceProvider(item.label, type);
  };

  return (
    <View
      style={{
        width: width,
      }}>
      <Dropdown
        label="tets"
        data={data}
        onSelect={onSelect}
        selectedProp={findSelected}
      />
    </View>
  );
};

export default ChangeSourceProvider;
