import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'react-native';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import AboutUs from '@screens/AboutUs';
import ResetScreen from '../screens/ResetPassword';
import ChangeLanguage from '@screens/ChangeLanguage';
import ChangePassword from '@screens/ChangePassword';
import Setting from '@screens/Setting';
import ContactUs from '@screens/ContactUs';
import ThemeSetting from '@screens/ThemeSetting';
import ProfileEdit from '@screens/ProfileEdit';
import Review from '@screens/Review';
import SelectFontOption from '@screens/SelectFontOption';
import FCategory from '@screens/FCategory';

import Notification from '@screens/Notification';

import {BottomTabNavigatorMazi, tabBarIcon} from './components';
import Billing from '../screens/Billing';
import Facility from '../screens/Facility';
import Announce from '../screens/Announce';
import AnnounceDetail from '../screens/AnnouceDetail';
import News from '../screens/News';
import Rent from '../screens/Rent';
import EProductDetail from '../screens/EProductDetail';
import PostDetail from '../screens/PostDetail';
import MeterInfo from '../screens/MeterInfo';
import Search from '../screens/Search';
import PreviewImage from '../screens/PreviewImage';

import SelectDarkOption from '../screens/SelectDarkOption';

const Stack = createStackNavigator();

export const WalletTabScreens = {
  HomeScreen: {
    component: HomeScreen,
    options: {
      title: 'home',
      tabBarIcon: ({color}) => tabBarIcon({color, name: 'home'}),
    },
  },
  EmegerncyScreen: {
    component: ProfileScreen,
    options: {
      title: 'Emergency',
      tabBarIcon: ({color}) => tabBarIcon({color, name: 'phone'}),
    },
  },
  ProfileScreen: {
    component: ProfileScreen,
    options: {
      title: 'account',
      tabBarIcon: ({color}) => tabBarIcon({color, name: 'cog'}),
    },
  },
};

export const WalletMenu = () => (
  <BottomTabNavigatorMazi tabScreens={WalletTabScreens} />
);

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={WalletMenu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
        creenOptions={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangeLanguage"
        component={ChangeLanguage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ThemeSetting"
        component={ThemeSetting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Review"
        component={Review}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectFontOption"
        component={SelectFontOption}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FCategory"
        component={FCategory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Billing"
        component={Billing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MeterInfo"
        component={MeterInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Facility"
        component={Facility}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Announce"
        component={Announce}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="News"
        component={News}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Rent"
        component={Rent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EProductDetail"
        component={EProductDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AnnouceDetail"
        component={AnnounceDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PreviewImage"
        component={PreviewImage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectDarkOption"
        component={SelectDarkOption}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
