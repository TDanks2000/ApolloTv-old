import {styled} from 'styled-components/native';
import {Animated} from 'react-native';
import {rgba} from 'polished';

const borderRadius = '35px';

export const InfoTopContainer = styled(Animated.View)`
  width: 100%;
  height: 350px;
  border-bottom-left-radius: ${borderRadius};
  border-bottom-right-radius: ${borderRadius};
  overflow: hidden;

  background: ${({theme}) => rgba(theme.text.offWhite, 0.2)};
`;

export const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  padding: 15px 20px 25px 20px;
  flex-direction: column;
  justify-content: space-between;
`;

export const TopContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
`;

export const BackButton = styled.View`
  width: 40px;
  height: 40px;
  background-color: black;
  border-radius: 999px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({theme}) => theme.base.navBg};
`;

export const RatingContainer = styled.View`
  width: 70px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  padding: 5px 10px;
  border-radius: 10px;

  background: ${({theme}) => theme.base.navBg};
`;

export const BottomContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
`;

export const Title = styled.View`
  width: 80%;
  height: 25px;

  border-radius: 8px;

  background: ${({theme}) => theme.base.navBg};
`;

export const Text = styled(Title)`
  width: 50%;
`;

export const Button = styled.View`
  width: 150px;
  height: 45px;

  border-radius: 8px;

  background: ${({theme}) => theme.base.navBg};
`;
