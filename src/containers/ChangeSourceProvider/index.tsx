import {View} from 'react-native';
import React, {PropsWithChildren} from 'react';
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
  type?: 'anime' | 'manga';
};

const ChangeSourceProvider: React.FC<PropsWithChildren<Props>> = ({
  width,
  type = 'anime',
}) => {
  const {sourceProvider, changeSourceProvider} =
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

  const {data, isError, error, isPending} = useQuery<DataType[]>({
    queryKey: ['sourceDropdown', type],
    queryFn: fetcher,
  });

  if (isPending) return <MiddleOfScreenLoadingComponent />;
  if (isError)
    return (
      <MiddleOfScreenTextComponent
        text={error?.message ? error.message : 'There was an unexpected error!'}
      />
    );

  const findSelected = () => {
    if (!sourceProvider)
      return data.find(val => val.label.toLowerCase().includes('gogo'));

    return data.find(val => val.label.toLowerCase().includes(sourceProvider));
  };

  const onSelect = (item: any) => {
    setSelected(item);
    if (changeSourceProvider) changeSourceProvider(item.label);
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
