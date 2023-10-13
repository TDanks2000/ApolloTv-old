import React from 'react';
import {View, Image, ActivityIndicator} from 'react-native';

type Props = {
  thumbnailSource: string;
  source: string;
};

const ProgressiveImage: React.FC<Props> = ({thumbnailSource, source}) => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <View>
      {isLoading && (
        <ActivityIndicator
          style={{position: 'absolute', alignSelf: 'center'}}
        />
      )}
      <Image
        style={{width: '100%', height: '100%'}}
        source={{
          uri: isLoading ? thumbnailSource : source,
        }}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );
};

export default ProgressiveImage;
