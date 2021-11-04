import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Pressable, Image, ImageBackground, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button, IconButton } from '../components';
import { firebase, auth } from '../../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import Card from "../components/card";
import Constants from 'expo-constants';
import Header from '../components/homeScreenHeader.js';
const { height } = Dimensions.get('window');

export default function HomeScreen() {

  const { user } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  const [recados, setRecados] = useState([]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const getRecados = async () => {
    try {

      var user_ano;
      var user_curso;
      var user_turno;

      firebase.firestore().collection('users').doc(user.uid).get()
        .then(doc => {
          user_ano = doc.data().ano
          user_curso = doc.data().curso
          user_turno = doc.data().turno
        })

      const recadosRef = firebase.firestore().collection('recados');
      const snapshot = await recadosRef.orderBy('timestamp', 'desc').get()
      const recadosList = new Array()

      // Filtragem dos recados por curso, ano e turma;
      snapshot.forEach(doc => {
        if ((doc.data().curso_dest == user_curso
          || doc.data().curso_dest == '')
          && (doc.data().ano_dest == user_ano
            || doc.data().ano_dest == '')
          && (doc.data().turno_dest == user_turno
            || doc.data().turno_dest == ''))
          recadosList.push(doc)
      })

      setRecados(recadosList.map((doc) => ({
        id: doc.id,
        titulo: doc.data().titulo,
        timestamp: doc.data().timestamp,
        remetente: doc.data().remetente,
        curso_dest: doc.data().curso_dest,
        ano_dest: doc.data().ano_dest,
        turno_dest: doc.data().turno_dest,
        texto: doc.data().texto
      })))
      setLoading(false)

    } catch (err) {
      Alert.alert("Erro ao consultar os recados!!!", err.message);
    }
  };

  // Funcao executada quando a tela e' carregada
  useEffect(() => {
    getRecados()
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/background_homeScreen.png')}
    >
      <Button
        onPress={handleSignOut}
      />
      <Header />
      <View style={styles.flatlist_container}>
        {recados.length == 0   // Se nao houver mensagens, exibe uma mensagem ao usuario
          ? <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: '#FFF' }}>Nenhuma mensagem</Text>
            <Text></Text>
            <Button
              onPress={() => { getRecados(); }}
              backgroundColor='#f57c00'
              title='Recarregar'
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
                marginBottom: 20
              }}
            />
          </View>
          : <FlatList   // Caso hajam mensagens baixadas, exibe-as em forma de lista
            data={recados}
            renderItem={({ item }) => (
              <Card
                texto={item.texto}
                titulo={item.titulo}
                timestamp={item.timestamp}
                info1={item.remetente}
                info2={'ao ' +
                  item.ano_dest + 'º '
                  + item.curso_dest + ' '
                  + item.turno_dest}
              />
            )}
          />
        }
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    height: height + 100,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  flatlist_container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 12,
  },
});