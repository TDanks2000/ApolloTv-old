import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import BaseModal from '../../BaseModal';
import {
  Background,
  Container,
  Input,
  InputButton,
  InputButtonIcon,
  InputButtons,
  InputContainer,
  RateButton,
  RateButtonText,
} from './RateModal.styles';
import {useAccessToken} from '../../../contexts';
import {Anilist} from '@tdanks2000/anilist-wrapper';
import {AnimeInfo, FullMangaInfo} from '../../../@types';

type Props = {
  visible: boolean;
  closeFunction: () => void;

  anime_info?: AnimeInfo;
  manga_info?: FullMangaInfo;
  score: string | undefined;
};

const RateModal: React.FC<Props> = ({
  visible,
  closeFunction,
  anime_info,
  manga_info,
  score,
}) => {
  const {accessToken} = useAccessToken();
  const anilist = new Anilist(accessToken);

  const scoreAsNumber = parseInt(score!);
  const scoreAsNumberPadded = parseInt(String(scoreAsNumber).padEnd(2, '0'));

  const [rating, setRating] = React.useState<number>(
    isNaN(scoreAsNumber) ? 0 : scoreAsNumberPadded,
  );

  const changeRating = (increaseBy: number) => {
    setRating(prev => (!prev ? 1 : prev + increaseBy));
  };

  const upDisabled = rating >= 100;
  const downDisabled = rating <= 0;

  const rate = async () => {
    try {
      await anilist.user.updateMedia({
        scoreRaw: rating,
        mediaId: parseInt(anime_info ? anime_info.id : manga_info!.id),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseModal
      closeFunction={closeFunction}
      visible={visible}
      animationType="fade">
      <Background>
        <Container>
          <InputContainer>
            <Input
              keyboardType="number-pad"
              value={rating.toString()}
              onChangeText={(text: string) => {
                const actualText = parseInt(text.replace(/[^0-9]/g, ''));
                if (actualText >= 100) return setRating(100);
                if (actualText <= 0) return setRating(0);
                setRating(isNaN(actualText) ? 0 : actualText);
              }}
            />
            <InputButtons>
              <InputButton
                disabled={upDisabled}
                onPress={() => changeRating(1)}>
                <InputButtonIcon name={'chevron-up'} disabled={upDisabled} />
              </InputButton>
              <InputButton
                disabled={downDisabled}
                onPress={() => changeRating(-1)}>
                <InputButtonIcon
                  name={'chevron-down'}
                  disabled={downDisabled}
                />
              </InputButton>
            </InputButtons>
          </InputContainer>
          <RateButton onPress={rate} disabled={downDisabled}>
            <RateButtonText>Rate</RateButtonText>
          </RateButton>
        </Container>
      </Background>
    </BaseModal>
  );
};

export default RateModal;
