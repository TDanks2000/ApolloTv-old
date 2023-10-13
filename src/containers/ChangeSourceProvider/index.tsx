import {View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {Dropdown} from '../../components';
import {DropdownData} from '../../@types';
import {AiringSchedule} from '../../utils/TestData';

import {Circle, Svg} from 'react-native-svg';
import {helpers, utils} from '../../utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SharedContainer} from '../../styles/sharedStyles';
import {SettingsContext} from '../../contexts';

type Props = {
  width: number | `${number}%`;
};

const ChangeSourceProvider: React.FC<PropsWithChildren<Props>> = ({width}) => {
  const {sourceProvider, changeSourceProvider} =
    React.useContext(SettingsContext);

  type DataType = DropdownData<string, string>;
  const [selected, setSelected] = React.useState<DataType | undefined>(
    undefined,
  );

  const data: DataType[] = [
    {
      label: 'gogoanime',
      value: '1',
      image:
        'https://play-lh.googleusercontent.com/MaGEiAEhNHAJXcXKzqTNgxqRmhuKB1rCUgb15UrN_mWUNRnLpO5T1qja64oRasO7mn0',
    },
    {
      label: 'animepahe',
      value: '2',
      image: 'https://animepahe.ru/apple-touch-icon.png',
    },
  ];

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
