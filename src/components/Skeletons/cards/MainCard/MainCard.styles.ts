import {styled} from 'styled-components/native';
import {rgba} from 'polished';

export const Container = styled.View`
  width: 130px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  background: ${({theme}) => rgba(theme.text.offWhite, 0.2)};
`;

export const Wrapper = styled.View`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;

export const RatingContainer = styled.View`
  width: 55px;
  height: 24px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  border-radius: 10px;
  align-self: flex-end;
  background: ${({theme}) => theme.base.navBg};
`;

export const Title = styled.View`
  width: 100%;
  height: 20px;
  background: ${({theme}) => theme.base.navBg};
  border-radius: 8px;
  margin-bottom: 5px;
`;

export const SubTitle = styled.View`
  margin-top: 5px;
  width: 100%;
  height: 20px;
  border-radius: 8px;
  background: ${({theme}) => theme.base.navBg};
  text-align: center;
  text-transform: capitalize;
`;
