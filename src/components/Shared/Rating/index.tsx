import {RatingContainer, RatingIcon, RatingText} from './Rating.styles';

interface Props {
  rating: number | undefined;
}

const RatingComponent = ({rating}: Props) => {
  return (
    // @ts-ignore
    <RatingContainer>
      <RatingText>{rating ? (rating / 10).toFixed(1) : '??'}</RatingText>
      <RatingIcon name="star" />
    </RatingContainer>
  );
};

export default RatingComponent;
