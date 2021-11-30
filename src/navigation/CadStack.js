import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CadastroScreen from '../screens/CadastroScreen';

const Stack = createStackNavigator();

export default function CadStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='Cadastro' component={CadastroScreen} /> 
    </Stack.Navigator>
  );
}