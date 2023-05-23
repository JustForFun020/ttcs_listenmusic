import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import HomeContainer from './components/Home/HomeContainer';
import Personal from './components/Personal/Personal';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import ChartContainer from './components/Chart/ChartContainer';
import RadioContainer from './components/Radio/RadioContainer';
import DetailsPodcast from './components/Radio/DetailsPodcast';

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
        <Stack.Screen name='RadioContainer' component={RadioContainer} />
        <Stack.Screen name='DetailsPodcast' component={DetailsPodcast} />
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
