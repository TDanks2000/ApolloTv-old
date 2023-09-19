import {View, Text} from 'react-native';
import React from 'react';
import {Character, MangaCharacter, SubOrDub, VoiceActor} from '../../../@types';
import {
  ActorName,
  BottomContainer,
  CharacterName,
  Container,
  ImageBackground,
  TopContainer,
  VoiceActorImage,
  Wrapper,
} from './CharacterCard.styles';

const MangaPersonCard = ({id, image, name, role}: MangaCharacter) => {
  return (
    <Container disabled>
      <ImageBackground
        source={{
          uri:
            image ??
            'https://w7.pngwing.com/pngs/765/178/png-transparent-no-matter-how-i-look-at-it-it-s-you-guys-fault-i-m-not-popular-slice-of-life-anime-comedy-others-miscellaneous-black-hair-computer-wallpaper.png',
        }}>
        {/* @ts-ignore */}
        <Wrapper type={'MANGA'}>
          <BottomContainer>
            <CharacterName>{name.full ?? '??'}</CharacterName>
            <ActorName>{role ?? '??'}</ActorName>
          </BottomContainer>
        </Wrapper>
      </ImageBackground>
    </Container>
  );
};

export default MangaPersonCard;
