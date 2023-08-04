import {View, Text} from 'react-native';
import React from 'react';
import {
  Container,
  OptionContainer,
  OptionDropDown,
  OptionDropDownItem,
  OptionDropDownItemText,
  OptionIcon,
  OptionIconContainer,
  OptionText,
  OptionWrapper,
  Wrapper,
} from '../../Info/Options/Options.styles';

import {MangaInfo} from '../../../@types';
import {useBreakpoints} from '../../../hooks';

type Props = {
  openChaptersModal: () => void;
  chaptersLength: number;
  manga_info: MangaInfo;
};

const Options: React.FC = () => {
  const {isMobile} = useBreakpoints();
  return (
    <Container>
      <Wrapper isMobile={isMobile}>
        <OptionContainer>
          <OptionWrapper>
            <OptionIconContainer>
              <OptionIcon name="book" />
            </OptionIconContainer>
            <OptionText>Chapters</OptionText>
          </OptionWrapper>
        </OptionContainer>
      </Wrapper>
    </Container>
  );
};

export default Options;
