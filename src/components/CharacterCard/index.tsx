import {View, Text} from 'react-native';
import React from 'react';
import {Character} from '../../@types';
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

const PersonCard = ({id, image, name, role, voiceActors}: Character) => {
  return (
    <Container disabled>
      <ImageBackground
        source={{
          uri:
            image ??
            'https://w7.pngwing.com/pngs/765/178/png-transparent-no-matter-how-i-look-at-it-it-s-you-guys-fault-i-m-not-popular-slice-of-life-anime-comedy-others-miscellaneous-black-hair-computer-wallpaper.png',
        }}>
        {/* @ts-ignore */}
        <Wrapper>
          <TopContainer>
            <VoiceActorImage
              source={{
                uri:
                  voiceActors[0]?.image ??
                  'https://w7.pngwing.com/pngs/765/178/png-transparent-no-matter-how-i-look-at-it-it-s-you-guys-fault-i-m-not-popular-slice-of-life-anime-comedy-others-miscellaneous-black-hair-computer-wallpaper.png',
              }}
            />
          </TopContainer>
          <BottomContainer>
            <CharacterName>{name.full ?? '??'}</CharacterName>
            <ActorName>{voiceActors[0]?.name.full ?? '??'}</ActorName>
          </BottomContainer>
        </Wrapper>
      </ImageBackground>
    </Container>
  );
};

export default PersonCard;
