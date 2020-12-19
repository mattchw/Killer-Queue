/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import { useSelector } from 'react-redux';

import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainTabScreen from './screens/MainTabScreen';
import RootStackScreen from './screens/root/RootStackScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/Ionicons';

const DetailsStack = createStackNavigator();

const Drawer = createDrawerNavigator();

const App = (props) => {
  const isLoggedIn = useSelector(store => store.authentication.loggedIn);
  return (
    <NavigationContainer>
      {
        !isLoggedIn ? (<RootStackScreen />) : (<Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={MainTabScreen} />
        </Drawer.Navigator>)
      }
    </NavigationContainer>
  );
};

export default App;
