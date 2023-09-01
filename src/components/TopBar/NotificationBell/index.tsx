import {View, Text} from 'react-native';
import React from 'react';
import {IconItemContainer, NotificationStatus} from './NotificationBell.styles';
import {IconItem} from '../TopBar.styles';

const NotificationBell = () => {
  return (
    <IconItemContainer>
      <IconItem name="bell" />
      <NotificationStatus />
    </IconItemContainer>
  );
};

export default NotificationBell;
