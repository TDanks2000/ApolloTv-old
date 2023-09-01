import {View, Text} from 'react-native';
import React from 'react';
import {
  MainContainer,
  LeftContainer,
  RightContainer,
  NotificationImage,
  NotificationTitle,
  NotificationDesc,
} from './NotificationCard.styles';

type Props = {
  notification_image: string;
  notification_title: string;
  notification_desc: string;
};

const NotificationCard: React.FC<Props> = ({
  notification_desc,
  notification_image,
  notification_title,
}) => {
  return (
    <MainContainer>
      <LeftContainer>
        <NotificationImage
          source={{
            uri: notification_image,
          }}
        />
      </LeftContainer>
      <RightContainer>
        <NotificationTitle numberOfLines={1}>
          {notification_title}
        </NotificationTitle>
        <NotificationDesc numberOfLines={2}>
          {notification_desc}
        </NotificationDesc>
      </RightContainer>
    </MainContainer>
  );
};

export default NotificationCard;
