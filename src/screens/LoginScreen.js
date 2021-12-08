import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';
import { Button, InputField, ErrorMessage } from '../components';
import { firebase, auth } from '../../config/firebase';
import SocialButton from '../components/SocialButton';
import * as Google from 'expo-google-app-auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');
  
  //Função esconder senha
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  //Função para logar com email
  const onLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  /*
  ESSE BLOCO SÓ FUNCIONA ONLINE F
  const LoginGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
  }
  */

  //Função para buscar usuário no firebase
  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
          return true;
        }
      }
    }
    return false;
  }
  
  //Função Login com as credenciais do Google
  function onSignIn(googleUser) {
    console.log('Google Auth Response', googleUser);
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      if (!isUserEqual(googleUser, firebaseUser)) {
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken,
        );
        firebase.auth().signInWithCredential(credential).catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }

  //Login com o Google Android 
  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '512511721451-95egtn8i15h272fiu6b9ur9hp7r4lrm3.apps.googleusercontent.com',
        //iosClientId: YOUR_CLIENT_ID_HERE, //IOS Client ID
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        onSignIn(result) //Chama a função com as credenciais do login android
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  
  return (
    <View style={styles.container}>

      <StatusBar style='dark-content' />

      <Text style={styles.title}>Tela de Login</Text>

      <InputField
        inputStyle={{
          fontSize: 20
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='email'
        placeholder='E-mail'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoFocus={true}
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <InputField
        inputStyle={{
          fontSize: 20
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='lock'
        placeholder='Senha'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType='password'
        rightIcon={rightIcon}
        value={password}
        onChangeText={text => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />

      {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}

      <Button
        onPress={onLogin}
        backgroundColor='#f57c00'
        title='Login'
        tileColor='#fff'
        titleSize={24}
        containerStyle={{
          marginBottom: 24
        }}
      />

      <SocialButton
        buttonTitle="Entrar com Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={signInWithGoogleAsync}
      />

      <RNButton
        onPress={() => navigation.navigate('Signup')}
        title='Criar conta'
        color='#000'
      />
      
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24
  }
});