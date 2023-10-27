import {View, FlatList} from 'react-native';
import {
  SectionTitle,
  SectionTitleContainer,
  SectionWrapper,
} from '../Sections/Sections.shared.styles';
import {RectangleCard} from '../../components';

interface Props {
  title: string;
  data: any[];
}

const CardContainer = ({title, data}: Props) => {
  const renderItem = ({item}: any) => {
    return (
      <RectangleCard
        key={item.id}
        title={item.title}
        poster_image={item.image}
        id={item.id}
        rating={item.rating}
        type={item?.type}
        relation_type={
          item?.type?.toLowerCase() === 'manga' ? 'MANGA' : item?.relationType
        }
      />
    );
  };

  if (!data) return null;

  data = data.filter(item => !['novel'].includes(item?.type?.toLowerCase()));

  if (!data?.length) return null;

  return (
    <>
      <SectionTitleContainer>
        <SectionTitle>{title}</SectionTitle>
      </SectionTitleContainer>
      <SectionWrapper>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={{width: 15}} />}
          contentContainerStyle={{paddingHorizontal: 20}}
          renderItem={renderItem}
        />
      </SectionWrapper>
    </>
  );
};

export default CardContainer;
