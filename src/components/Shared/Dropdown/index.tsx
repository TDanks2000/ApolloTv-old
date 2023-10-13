import React, {FC, ReactElement, useRef} from 'react';
import {View, Text, Modal, FlatList, TouchableOpacity} from 'react-native';
import {
  Button,
  ButtonImage,
  ButtonImageContainer,
  ButtonText,
  DropdownContainer,
  DropdownSeperator,
  Item,
  ItemImage,
  ItemImageContainer,
  ItemText,
  ModalButton,
} from './Dropdown.styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {DropdownData} from '../../../@types';

type DataType = any;

type Props = {
  label: string;
  data: Array<DataType>;
  selectedProp?: DataType;
  onSelect: (item: DataType) => void;
};

const Dropdown: FC<Props> = ({label, data, onSelect, selectedProp}) => {
  const [selected, setSelected] = React.useState<DataType | undefined>(
    selectedProp ?? undefined,
  );

  const DropdownButton = useRef<any>();
  const [dropdownTop, setDropdownTop] = React.useState(0);
  const [dropdownWidth, setDropdownWidth] = React.useState(0);
  const [dropdownPadding, setDropdownPadding] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    DropdownButton.current!.measure(
      (_fx: any, _fy: any, w: any, h: any, _px: any, py: any) => {
        setDropdownTop(py + h - 5);
        setDropdownWidth(w - 16);
        setDropdownPadding(_px + 9);
      },
    );
    setVisible(true);
  };

  const renderItem = ({item}: {item: DataType}): ReactElement<any, any> => (
    <Item onPress={() => onItemPress(item)}>
      {item.image ? (
        <ItemImageContainer>
          <ItemImage
            resizeMode="cover"
            source={{
              uri: item.image,
            }}
          />
        </ItemImageContainer>
      ) : null}
      <ItemText>{item.label}</ItemText>
    </Item>
  );

  const onItemPress = (item: any): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <ModalButton onPress={() => setVisible(false)}>
          <DropdownContainer
            width={dropdownWidth}
            style={{
              top: dropdownTop,
              marginLeft: dropdownPadding,
            }}>
            <FlatList
              style={{width: dropdownWidth, flexGrow: 0, maxHeight: 200}}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <DropdownSeperator />}
            />
          </DropdownContainer>
        </ModalButton>
      </Modal>
    );
  };

  return (
    // @ts-ignore
    <Button onPress={toggleDropdown} ref={DropdownButton}>
      {renderDropdown()}
      {selected?.image ? (
        <ButtonImageContainer>
          <ButtonImage
            source={{
              uri: selected?.image,
            }}
            resizeMode="cover"
          />
        </ButtonImageContainer>
      ) : null}

      <ButtonText>{(selected && selected.label) || label}</ButtonText>
      <Icon name="chevron-down" color={'#000'} />
    </Button>
  );
};

export default Dropdown;
