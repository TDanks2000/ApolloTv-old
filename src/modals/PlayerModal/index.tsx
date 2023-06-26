import {View, Text, Modal} from 'react-native';
import React from 'react';
import {ModalContainer} from '../../styles/sharedStyles';

import Video, {OnLoadData, OnProgressData} from 'react-native-video';
import {Player} from '../../components';

const PlayerModal = () => {
  const videoRef = React.useRef(null);

  const [paused, setPaused] = React.useState(true);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);

  const onProgress = (data: OnProgressData) => {
    setCurrentTime(data.currentTime);
  };

  const onLoad = (data: OnLoadData) => {
    setDuration(data.duration);
  };

  return (
    <Modal visible={true} transparent={true} animationType={'slide'}>
      <ModalContainer>
        <Player.PlayerControls
          paused={paused}
          setPaused={setPaused}
          videoRef={videoRef}
          currentTime={currentTime ?? 0}
          duration={duration ?? 0}
        />
        <Video
          ref={videoRef}
          onLoad={onLoad}
          onProgress={onProgress}
          onBuffer={() => console.log('buffering')}
          source={{
            uri: 'https://www020.vipanicdn.net/streamhls/0b594d900f47daabc194844092384914/ep.5.1677648809.1080.m3u8',
          }}
          muted
          paused={paused}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </ModalContainer>
    </Modal>
  );
};

export default PlayerModal;
