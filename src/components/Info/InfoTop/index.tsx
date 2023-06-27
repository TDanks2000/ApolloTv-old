import {View, Text} from 'react-native';
import React from 'react';
import {
  BackButton,
  BackButtonIcon,
  BottomBottomContainer,
  BottomContainer,
  Container,
  ImageBackground,
  SeasonText,
  TitleText,
  TopContainer,
  Wrapper,
} from './InfoTop.styles';
import {Option, RatingComponent, WatchNowComponent} from '../../Shared';
import {useNavigation} from '@react-navigation/native';
import {ITitleLanguageOptions, SubOrDub} from '../../../@types';
import {helpers, utils} from '../../../utils';

interface Props {
  rating: number;
  title: string | ITitleLanguageOptions;
  poster_image: string;
  dubOrSub: string;
  setDubOrSub: (dubOrSub: SubOrDub) => void;
}

const Top = ({rating, title, poster_image, setDubOrSub, dubOrSub}: Props) => {
  const actualTitle = utils.getTitle(title);

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <ImageBackground
        source={{
          uri: poster_image,
        }}>
        {/* @ts-ignore */}
        <Wrapper>
          <TopContainer>
            <BackButton onPress={goBack}>
              <BackButtonIcon name="arrow-left" />
            </BackButton>
            <RatingComponent rating={rating} />
          </TopContainer>
          <BottomContainer>
            {/* <SeasonText>Season 1</SeasonText> */}
            <TitleText numberOfLines={1}>{actualTitle}</TitleText>
            <BottomBottomContainer>
              <WatchNowComponent WatchText="Watch trailer" />
              <Option
                option={dubOrSub}
                options={[
                  {label: 'SUB', value: 'sub'},
                  {label: 'DUB', value: 'dub'},
                ]}
                setOption={(value: string) => setDubOrSub(value as SubOrDub)}
                onPress={(value: string) =>
                  helpers.setSubOrDub(value === 'sub' ? 'sub' : 'dub')
                }
              />
            </BottomBottomContainer>
          </BottomContainer>
        </Wrapper>
      </ImageBackground>
    </Container>
  );
};

export default Top;
