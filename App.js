import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import HomeContainer from './components/Home/HomeContainer';
import Personal from './components/Personal/Personal';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import ChartContainer from './components/Chart/ChartContainer';
import FollowContainer from './components/Follow/FollowContainer';
import RadioContainer from './components/Radio/RadioContainer';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Personal' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='Personal' component={Personal} />
        <Stack.Screen name='HomeContainer' component={HomeContainer} />
        <Stack.Screen name='ChartContainer' component={ChartContainer} />
        <Stack.Screen name='FollowContainer' component={FollowContainer} />
        <Stack.Screen name='RadioContainer' component={RadioContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
