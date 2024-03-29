import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { auth } from '../../config/firebase';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

export default function RootNavigator() {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      //Validação do Usuário
      const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
        try {
          await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      });
      return unsubscribeAuth;
    }, []);
  
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      );
    }
    
    //Vai para a Tela Principal caso a autenticação do usuário seja válida
    return (
      <NavigationContainer>  
        {user ? <HomeStack/> : <AuthStack/>} 
      </NavigationContainer>
    );
  }