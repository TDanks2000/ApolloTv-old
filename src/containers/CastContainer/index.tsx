import {FlatList, View} from 'react-native';
import {Character, MangaCharacter, MediaTypes, SubOrDub} from '../../@types';
import {CharacterCard, MangaCharacterCard} from '../../components';
import {
  SectionTitle,
  SectionTitleContainer,
  SectionWrapper,
} from '../Sections/Sections.shared.styles';

type Props = {
  type?: MediaTypes;
  characters: Character[] | MangaCharacter[];
  subOrDub?: SubOrDub | undefined;
} & (
  | {
      type: 'ANIME';
      characters: Character[];
      subOrDub: SubOrDub | undefined;
    }
  | {
      type: 'MANGA';
      characters: MangaCharacter[];
    }
);

const CharacterContainer = ({characters, subOrDub, type}: Props) => {
  const renderItem = (item: Character | MangaCharacter) => {
    if (type === 'MANGA') {
      return <MangaCharacterCard {...(item as MangaCharacter)} />;
    }
    return (
      <CharacterCard
        {...(item as Character)}
        key={`character-${item.id}`}
        subOrDub={subOrDub}
      />
    );
  };

  return (
    <>
      <SectionTitleContainer>
        <SectionTitle>Characters</SectionTitle>
      </SectionTitleContainer>

      <SectionWrapper>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={characters as any}
          renderItem={({item}: {item: MangaCharacter | Character}) =>
            renderItem(item)
          }
          ItemSeparatorComponent={() => <View style={{width: 20}} />}
          contentContainerStyle={{paddingHorizontal: 20}}
        />
      </SectionWrapper>
    </>
  );
};

export default CharacterContainer;
