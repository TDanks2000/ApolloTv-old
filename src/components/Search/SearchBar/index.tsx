import React from 'react';
import {Container, TextInput} from './SearchBar.styles';

interface Props {
  search_text: string;
  setSearchText: (text: string) => void;
}

const SearchBar = ({search_text, setSearchText}: Props) => {
  return (
    <Container>
      <TextInput
        value={search_text}
        onChangeText={(text: string) => setSearchText && setSearchText(text)}
        placeholder="What do you want to watch?"
      />
    </Container>
  );
};

export default SearchBar;
