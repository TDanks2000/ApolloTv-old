import {Character, SubOrDub, VoiceActor} from '../../../@types';
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

interface Props extends Character {
  subOrDub: SubOrDub | undefined;
}

const PersonCard = ({id, image, name, role, voiceActors, subOrDub}: Props) => {
  const findVoiceActor = (): VoiceActor | undefined => {
    const language = subOrDub === 'dub' ? 'english' : 'japanese';
    return voiceActors.find(
      actor => actor.language?.toLowerCase() === language,
    );
  };

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
                  findVoiceActor()?.image ??
                  'https://w7.pngwing.com/pngs/765/178/png-transparent-no-matter-how-i-look-at-it-it-s-you-guys-fault-i-m-not-popular-slice-of-life-anime-comedy-others-miscellaneous-black-hair-computer-wallpaper.png',
              }}
            />
          </TopContainer>
          <BottomContainer>
            <CharacterName>{name.full ?? '??'}</CharacterName>
            <ActorName>{findVoiceActor()?.name.full ?? '??'}</ActorName>
          </BottomContainer>
        </Wrapper>
      </ImageBackground>
    </Container>
  );
};

export default PersonCard;
