import {View, useWindowDimensions} from 'react-native';
import React from 'react';
import {
  Circle,
  Circles,
  Container,
  SelectedCircle,
  Wrapper,
} from './Banner.styles';
import {AnimeTrending} from '../../utils/TestData';
import BannerCard from './BannerItem';
import {NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import {api} from '../../utils';
import {useQuery} from '@tanstack/react-query';
import {useBreakpoints} from '../../hooks';

const BannerComponent = () => {
  const {isMobile} = useBreakpoints();

  const fetcher = async () => {
    return await api.fetcher(api.getSectionUrl('trending'));
  };

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['Banner', 'trending'],
    queryFn: fetcher,
  });

  const [index, setCurrentIndex] = React.useState(0);

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

  if (isPending || isError) return null;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const totalWidth = e.nativeEvent.layoutMeasurement.width;
    const xPos = e.nativeEvent.contentOffset.x * (isMobile ? 1.1 : 2.2);

    const current = Math.floor(xPos / totalWidth);

    if (current >= data?.results?.length)
      return setCurrentIndex(data?.results?.length - 1);
    setCurrentIndex(current <= 0 ? 0 : current);
  };

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
        scrollEventThrottle={16}
        // snapToInterval={screenSize}
        snapToAlignment="center"
        ItemSeparatorComponent={() => <View style={{width: 15}} />}
        onScroll={onScroll}
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
