import {
  Container,
  Item,
  ItemLG,
  ItemMD,
  ItemSM,
  ItemText,
  ItemTextLG,
  ItemTextMD,
  ItemTextSM,
} from './Options.styles';

interface Props {
  options: {
    value: string;
    label: string;
  }[];
  setOption?: (value: string) => void;
  option: string;
  onPress?: (value: any) => void;

  size?: 'sm' | 'md' | 'lg';
}

const Option = ({options, setOption, option, onPress, size}: Props) => {
  const handlePress = (value: string) => {
    if (setOption) setOption(value);
    if (onPress) onPress(value);
  };

  return (
    <Container>
      {options.map(o => {
        const active: boolean = o.value === option;

        const props: any = {
          key: o.value,
          onPress: () => handlePress(o.value),
          activeOpacity: 0.7,
          // @ts-ignore
          isActive: active,
          disabled: active,
          size,
        };

        if (size === 'sm')
          return (
            <ItemSM {...props}>
              <ItemTextSM isActive={active}>{o.label}</ItemTextSM>
            </ItemSM>
          );

        if (size === 'md')
          return (
            <ItemMD {...props}>
              <ItemTextMD isActive={active}>{o.label}</ItemTextMD>
            </ItemMD>
          );

        if (size === 'lg')
          return (
            <ItemLG {...props}>
              <ItemTextLG isActive={active}>{o.label}</ItemTextLG>
            </ItemLG>
          );

        return (
          <Item {...props}>
            <ItemText isActive={active}>{o.label}</ItemText>
          </Item>
        );
      })}
    </Container>
  );
};

export default Option;
