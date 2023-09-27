import {View, Text} from 'react-native';
import React from 'react';
import {Container} from './Options.styles';
import {PillComponent} from '../../Shared';

type Props = {
  wantManga: boolean;
  setWantManga: (manga: boolean) => void;
};

const MediaType: React.FC<Props> = ({wantManga = false, setWantManga}) => {
  const handlePress = () => {
    setWantManga(!wantManga);
  };

  return (
    <Container horizontal={true} showsHorizontalScrollIndicator={false}>
      <PillComponent
        active={!wantManga}
        onPress={handlePress}
        disabled={!wantManga}
        title="ANIME"
      />
      <PillComponent
        active={wantManga}
        onPress={handlePress}
        disabled={wantManga}
        title={'MANGA'}
      />
    </Container>
  );
};

export default MediaType;
