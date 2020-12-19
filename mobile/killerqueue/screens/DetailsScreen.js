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

function DetailsScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to detail Screen... again"
        onPress={()=>navigation.push("Details")}
      />
      <Button
        title="Go to Home"
        onPress={()=>navigation.navigate("Home")}
      />
      <Button
        title="Go back"
        onPress={()=>navigation.goBack()}
      />
      <Button
        title="Go to first screen"
        onPress={()=>navigation.popToTop()}
      />
    </View>
  );
}

export default DetailsScreen;