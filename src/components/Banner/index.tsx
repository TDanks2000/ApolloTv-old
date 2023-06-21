import {View, useWindowDimensions} from 'react-native';
import React from 'react';
import {Container, Wrapper} from './Banner.styles';
import {AnimeTrending} from '../../utils/TestData';
import BannerCard from './BannerItem]';

const BannerComponent = () => {
  const {results: data} = AnimeTrending;
  const {width} = useWindowDimensions();
  const screenSize = width * 0.8;

  const renderItem: any = ({item}: any) => {
    return (
      <BannerCard
        key={item.id}
        image={item.image}
        rating={item.rating}
        title={item.title?.english}
        screenSize={screenSize}
      />
    );
  };

  return (
    <Container>
      <Wrapper
        data={data}
        renderItem={renderItem}
        horizontal
        bounces={false}
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={screenSize}
        ItemSeparatorComponent={() => <View style={{width: 20}} />}
      />
    </Container>
  );
};

export default BannerComponent;
