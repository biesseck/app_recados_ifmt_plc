import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Pressable, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Button } from '../components';
import { firebase, auth } from '../../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import filter from 'lodash.filter'
import Card from "../components/card";
import Constants from 'expo-constants';
import CadStack from '../navigation/CadStack';
const { height } = Dimensions.get('window');
var user_setor = [];
var usertype;
var user_ano;
var user_curso;
var user_turno;


export default function HomeScreen({ navigation }) {

  const { user } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  const [recados, setRecados] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [fullData, setFullData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const getRecados = async () => {
    setRefreshing(true);
    try {
      firebase.firestore().collection('users').doc(user.uid).get()
        .then(doc => {
          user_ano = doc.data().ano
          user_curso = doc.data().curso
          user_turno = doc.data().turno
          user_setor = doc.data().setor
          usertype = doc.data().usertype
        })

      const recadosRef = firebase.firestore().collection('recados');
      const snapshot = await recadosRef.orderBy('timestamp', 'desc').get()
      const recadosList = new Array()

      // Filtragem dos recados por curso, ano e turma;
      if(usertype == 1){
        snapshot.forEach(doc => {
          if ((doc.data().curso_dest == user_curso
            || doc.data().curso_dest == '')
            && (doc.data().ano_dest == user_ano
              || doc.data().ano_dest == '')
            && (doc.data().turno_dest == user_turno
              || doc.data().turno_dest == ''))
            recadosList.push(doc)
        })
      }else{
        snapshot.forEach(doc => {
          if ((doc.data().remetente == user_setor[0] // só as duas posições tá bom
            || doc.data().remetente == user_setor[1])) // nunca vi ngm com mais de dois setor no IF
            recadosList.push(doc)
        })

      }
      
      setFullData(recadosList.map((doc) => ({
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
      setRecados(fullData)
      handleSearch('')
    } catch (err) {
      Alert.alert("Erro ao consultar os recados!!!", err.message);
    }
    setRefreshing(false);
  };

  const contem = (doc, query) => {
    let i = false;
    Object.values(doc).forEach(value => {
      if (i) return true
      if (doc.id == value) {
        return;
      } else if (typeof value === 'string' || value instanceof String) {
        i = value.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(query)
      } else {
        i = (value.toDate().getDate() + '/'
          + value.toDate().getMonth() + '/'
          + value.toDate().getFullYear())
          .includes(query)
      }
    })
    return i;
  }

  const handleSearch = (text) => {
    let normalQuery = text.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
    const data = filter(fullData, doc => {
      return contem(doc, normalQuery)
    })
    setPesquisa(text)
    setRecados(data)
  }

  // Funcao executada quando a tela e' carregada
  useEffect(() => {
    vefUser()
    getRecados()
    console.log('funciona bixo')
  }, []);

  const [teste, setTeste] = useState(false)

  const vefUser = () => {
    firebase.firestore().collection('users').doc(user.uid).get()
      .then(doc => {
        if (!doc.exists) {
          setTeste(true)
        } else {
        }
      })
  }

  if (teste == true) {
    return (
      <CadStack/>
    );
  } else{
    return (
      <ImageBackground
        style={styles.container}
        source={require('../../assets/background_homeScreen.png')}
      >
        <View style={styles.header_container}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', height: '35%', alignItems: 'center' }}>
            <Pressable
              onPress={() => handleSignOut()}
            >
              <Image
                style={styles.logo}
                source={require('../../assets/iflogo_white_40x53.png')}
              />
            </Pressable>
            <View style={styles.searchBar}>
              <Image
                style={styles.searchIcon}
                source={require('../../assets/searchIcon.png')}
              />
              <TextInput style={styles.searchBar_input}
                onChangeText={handleSearch}
                value={pesquisa}
                placeholder='Pesquisar'
              />
              <Pressable
                onPress={() => handleSearch('')}
                style={{
                  paddingVertical: 10 // Deixa o botão mais fácil de apertar 
                }}
              >
                <Image
                  style={{ marginRight: 5 }}
                  source={require('../../assets/crossIcon.png')}
                />
              </Pressable>
            </View>
          </View>
        </View>
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
              onRefresh={getRecados}
              refreshing={refreshing}
              showsVerticalScrollIndicator={false}
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
        {usertype = 2 // Só mostra o botão de enviar mensagem se o usuário for do tipo 2 (no fim é a mesma coisa que antes).
          ?
          <TouchableOpacity
            style={styles.button}
            activeOpacity={.95}
            onPress={() => { navigation.navigate('NewCard') }}
          >
            <Image
              style={{ resizeMode: 'contain', height: '100%', width: '100%' }}
              source={require('../../assets/sendIcon_white.png')}
            />
          </TouchableOpacity>
          : <View></View>}
        <StatusBar style={'auto'} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    height: height + 500,
    alignItems: 'flex-end',
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
    flex: 1,
  },
  header_container: {
    width: '100%',
    height: Constants.statusBarHeight + 40,
    backgroundColor: '#2F9E41',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  searchBar: {
    width: '85%',
    height: 25,
    borderRadius: 5,
    backgroundColor: '#4ABD5E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 2,
  },
  logo: {
    height: 25,
    resizeMode: 'contain',
    marginRight: 5,
  },
  searchIcon: {
    height: 15,
    resizeMode: 'contain',
  },
  searchBar_input: {
    height: '200%', // 100% o texto sai cortado.
    width: '85%',
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: '3%',
    width: '14%',
    height: '7%',
    backgroundColor: '#2F9E41',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    alignItems: 'center'
  }
});