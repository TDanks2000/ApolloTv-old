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

import {FullMangaInfo} from '../../../@types';
import {useBreakpoints} from '../../../hooks';

type Props = {
  openChaptersModal: () => void;
  chaptersLength: number;
  manga_info: FullMangaInfo;
};

const Options: React.FC<Props> = ({
  chaptersLength,
  manga_info,
  openChaptersModal,
}) => {
  const {isMobile} = useBreakpoints();
  return (
    <Container>
      <Wrapper isMobile={isMobile}>
        <OptionContainer>
          <OptionWrapper
            onPress={openChaptersModal}
            disabled={chaptersLength === 0}>
            <OptionIconContainer>
              <OptionIcon name="book" />
            </OptionIconContainer>
            <OptionText>Chapters</OptionText>
          </OptionWrapper>
        </OptionContainer>

        <OptionContainer>
          <OptionWrapper disabled>
            <OptionIconContainer>
              <OptionIcon name="ban" />
            </OptionIconContainer>
            <OptionText style={{textTransform: 'uppercase'}}>W.I.P</OptionText>
          </OptionWrapper>
        </OptionContainer>

        <OptionContainer>
          <OptionWrapper disabled>
            <OptionIconContainer>
              <OptionIcon name="ban" />
            </OptionIconContainer>
            <OptionText style={{textTransform: 'uppercase'}}>W.I.P</OptionText>
          </OptionWrapper>
        </OptionContainer>

        <OptionContainer>
          <OptionWrapper disabled>
            <OptionIconContainer>
              <OptionIcon name="ban" />
            </OptionIconContainer>
            <OptionText style={{textTransform: 'uppercase'}}>W.I.P</OptionText>
          </OptionWrapper>
        </OptionContainer>
      </Wrapper>
    </Container>
  );
};

export default Options;
