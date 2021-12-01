import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import NewCardScreen from '../screens/NewCardScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    //<Stack.Navigator  headerMode='none'>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='NewCard' component={NewCardScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
    </Stack.Navigator>
  );
}
