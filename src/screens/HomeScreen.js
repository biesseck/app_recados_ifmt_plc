import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from '../components';
import {firebase, auth} from '../../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import * as Google from 'expo-google-app-auth';

export default function HomeScreen() {
  
  const {user} = useContext(AuthenticatedUserContext);
  
  const handleSignOut = async () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
        
      <View style={styles.row}>
        <Text style={styles.title}>Usuário logado!</Text>
        <IconButton
          name='logout'
          size={24}
          color='#fff'
          onPress={handleSignOut}
        />
      </View>

      <Text style={styles.title}>E-mail: {user.email}</Text>
      <Text style={styles.text}>User ID: {user.uid} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#53b55b',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff'
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#fff'
  }
});