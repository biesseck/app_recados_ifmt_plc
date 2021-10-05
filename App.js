import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaLogin from './src/screens/TelaLogin';
import TelaInicial from './src/screens/TelaInicial';

import Routes from './src/navigation';

export default function App() {

  return (

    <Routes/>
  
  );


  /*
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>

      <Stack.Navigator>
      
        <Stack.Screen
          name="TelaLogin"
          component={TelaLogin}
          options={{ title: 'Título da Tela de Login'}}
        />

        <Stack.Screen
          name="TelaInicial"
          component={TelaInicial}
          options={{ title: 'Título da Tela Inicial'}}
        />
      
      </Stack.Navigator>
      
    </NavigationContainer>
  );
  */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
