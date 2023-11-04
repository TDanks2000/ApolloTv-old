import React from 'react';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  NavBarContainer,
  NavBarWrapper,
  NavBarIcon,
  NavBarItem,
  NavBarText,
} from './NavigationBar.styles';
import {NavigationContext} from '../../contexts';
import {useTranslation} from 'react-i18next';

interface Props {
  currentRoute: string;
}

const NavigationBar = ({currentRoute}: Props) => {
  const {t} = useTranslation();

  const {showNavBar}: any = React.useContext(NavigationContext);
  const navigation: any = useNavigation();

  const handleStackChange = (stackName: any) => {
    navigation.navigate(stackName);
  };

  if (!showNavBar || Platform.isTV) return null;

  return (
    <NavBarContainer>
      <NavBarWrapper>
        <NavBarItem
          onPress={() => handleStackChange('Home')}
          isFocused={currentRoute === 'Home' ? true : false}>
          <NavBarIcon
            name="home"
            isFocused={currentRoute === 'Home' ? true : false}
          />
          {currentRoute === 'Home' && <NavBarText>{t('home')}</NavBarText>}
        </NavBarItem>
        <NavBarItem
          onPress={() => handleStackChange('Search')}
          isFocused={currentRoute === 'Search' ? true : false}>
          <NavBarIcon
            name="search"
            isFocused={currentRoute === 'Search' ? true : false}
          />
          {currentRoute === 'Search' && <NavBarText>{t('search')}</NavBarText>}
        </NavBarItem>
        <NavBarItem
          onPress={() => handleStackChange('Lists')}
          isFocused={currentRoute === 'Lists' ? true : false}>
          <NavBarIcon
            name="list-ul"
            isFocused={currentRoute === 'Lists' ? true : false}
          />
          {currentRoute === 'Lists' && <NavBarText>{t('lists')}</NavBarText>}
        </NavBarItem>
        <NavBarItem
          onPress={() => handleStackChange('Settings')}
          isFocused={currentRoute === 'Settings' ? true : false}>
          <NavBarIcon
            name="cog"
            isFocused={currentRoute === 'Settings' ? true : false}
          />
          {currentRoute === 'Settings' && (
            <NavBarText>{t('settings')}</NavBarText>
          )}
        </NavBarItem>
      </NavBarWrapper>
    </NavBarContainer>
  );
};

export default NavigationBar;
