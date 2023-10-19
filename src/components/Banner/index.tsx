import {View} from 'react-native';
import {Container, Wrapper} from './Banner.styles';
import BannerCard from './BannerItem';
import {api} from '../../utils';
import {useQuery} from '@tanstack/react-query';
import {useBreakpoints} from '../../hooks';
import {BannerSkeleton} from '../Skeletons';

const BannerComponent = () => {
  const {isMobile} = useBreakpoints();

  const fetcher = async () => {
    return await api.fetcher(api.getSectionUrl('trending'));
  };

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['Banner', 'trending'],
    queryFn: fetcher,
  });

  // const [index, setCurrentIndex] = React.useState(0);

  const renderItem: any = ({item}: any) => {
    return (
      <BannerCard
        key={item.id}
        title={item.title}
        poster_image={item.image}
        id={item.id}
        rating={item.rating}
      />
    );
  };

  if (isPending) return <BannerSkeleton />;
  if (isError) return null;

  // const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   const totalWidth = e.nativeEvent.layoutMeasurement.width;
  //   const xPos = e.nativeEvent.contentOffset.x * (isMobile ? 1.1 : 2.2);

  //   const current = Math.floor(xPos / totalWidth);

  //   if (current >= data?.results?.length)
  //     return setCurrentIndex(data?.results?.length - 1);
  //   setCurrentIndex(current <= 0 ? 0 : current);
  // };

  return (
    <Container>
      <Wrapper
        data={data?.results}
        renderItem={renderItem}
        horizontal
        bounces={false}
        pagingEnabled
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}
        // snapToInterval={screenSize}
        snapToAlignment="center"
        ItemSeparatorComponent={() => <View style={{width: 15}} />}
        contentContainerStyle={{paddingHorizontal: 20}}
      />
      {/* <Circles>
        {data?.results?.map((item: any, dataIndex: number) => {
          if (dataIndex !== index)
            return <Circle key={`paginate-circle${dataIndex}`} />;
          if (dataIndex === index)
            return <SelectedCircle key={`paginate-circle${dataIndex}`} />;
        })}
      </Circles> */}
    </Container>
  );
};

export default BannerComponent;
