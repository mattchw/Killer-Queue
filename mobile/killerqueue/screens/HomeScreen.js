import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import { useDispatch } from 'react-redux';
import { authActions } from '../redux/actions/auth.action';

function HomeScreen({navigation}) {
  const dispatch = useDispatch();

  const logoutHandle = () => {
    dispatch(authActions.logout());
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="logout"
        onPress={()=>{
          logoutHandle();
        }}
      />
    </View>
  );
}

export default HomeScreen;