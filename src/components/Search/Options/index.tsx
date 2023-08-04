import {View, Text} from 'react-native';
import React from 'react';
import {Container, PillContainer, PillTitle} from './Options.styles';

type Props = {
  wantManga: boolean;
  setWantManga: (manga: boolean) => void;
};

const Options: React.FC<Props> = ({wantManga = false, setWantManga}) => {
  const handlePress = () => {
    setWantManga(!wantManga);
  };

  return (
    <Container horizontal={true} showsHorizontalScrollIndicator={false}>
      <PillContainer
        active={!wantManga}
        onPress={handlePress}
        disabled={!wantManga}>
        <PillTitle>ANIME</PillTitle>
      </PillContainer>
      <PillContainer
        active={wantManga}
        onPress={handlePress}
        disabled={wantManga}>
        <PillTitle>MANGA</PillTitle>
      </PillContainer>
    </Container>
  );
};

export default Options;
