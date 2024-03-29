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
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
console.disableYellowBox = true;
const { height } = Dimensions.get('window');
const Drawer = createDrawerNavigator();

// Variáveis do Usuário
const usuario = {
  ano: '',
  curso: '',
  turno: '',
  setor: [],
}
//---------------------

//HomeScreen
export function HomeScreen({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  const [recados, setRecados] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [fullData, setFullData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [doc_user, setDoc_user] = useState(false)

  //Função para deslogar
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  //Função para buscar recados na base
  const getRecados = async () => {
    setRefreshing(true);
    try {
      const recadosRecebidos = firebase
        .firestore()
        .collection("recados")
        .orderBy("timestamp", "desc")
        .onSnapshot(
          snapshot => {
            const recadosList = snapshot.docs.reduce((result, doc) => {
              if (usuario.setor.length == 0) {
                  if ((doc.data().curso_dest == usuario.curso || doc.data().curso_dest == "") && (doc.data().ano_dest == usuario.ano || doc.data().ano_dest == "") && (doc.data().turno_dest == usuario.turno || doc.data().turno_dest == "")){
                    result.push({
                      id: doc.id,
                      titulo: doc.data().titulo,
                      timestamp: doc.data().timestamp,
                      remetente: doc.data().remetente,
                      curso_dest: doc.data().curso_dest,
                      ano_dest: doc.data().ano_dest,
                      turno_dest: doc.data().turno_dest,
                      texto: doc.data().texto,
                    });
                  }
              } else {
                  if (usuario.setor.includes(doc.data().remetente)) {
                    result.push({
                      id: doc.id,
                      titulo: doc.data().titulo,
                      timestamp: doc.data().timestamp,
                      remetente: doc.data().remetente,
                      curso_dest: doc.data().curso_dest,
                      ano_dest: doc.data().ano_dest,
                      turno_dest: doc.data().turno_dest,
                      texto: doc.data().texto,
                    });
                  }
              }
              return result
            }, []);
            setFullData(recadosList);
            setRecados(recadosList);
          },
          () => {
            setError(true);
          }
        );
      setLoading(false);
      // return() => recadosRecebidos();
    } catch (err) {
      Alert.alert("Erro ao consultar os recados!!!", err.message);
    }
    setRefreshing(false);
  };

  const contem = (doc, query) => {
    let arr = Object.values(doc);
    for (let i = 0; i < arr.length; i++) {
      if (doc.id == arr[i]) {
        // pass;
      } else if (typeof arr[i] === 'string' || arr[i] instanceof String) {
        if (arr[i].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(query)) {
          return true;
        }
      } else {
        if ((arr[i].toDate().getDate() + '/' + arr[i].toDate().getMonth() + '/' + arr[i].toDate().getFullYear()).includes(query)) {
          return true;
        }
      }
    }
    return false;
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

  //Função para verificar o usuário
  const vefUser = () => {

    //Salva os Dados
    firebase.firestore().collection('users').doc(user.uid).get()
      .then(doc => {
        usuario.ano = doc.data().ano
        usuario.curso = doc.data().curso
        usuario.turno = doc.data().turno
        usuario.setor = doc.data().setor
      })

    //Verifica se ele tem documento
    firebase.firestore().collection('users').doc(user.uid).get()
      .then(doc => {
        if (!doc.exists) {
          setDoc_user(true)
        } else {
        }
      })
  }

  // Funcao executada quando a tela é carregada
  useEffect(() => {
    vefUser()
    getRecados()
  }, []);

  if (doc_user == true) {
    return (
      <CadStack /> // Chama a tela de cadastro se ele não tiver um documento
    );
  } else {
    return (
      <ImageBackground
        style={styles.container}
        source={require('../../assets/background_homeScreen.png')}
      >
        <View style={styles.header_container}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', height: '35%', alignItems: 'center' }}>

            <Pressable
              onPress={() => navigation.openDrawer()}
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
        {usuario.setor.length != 0 // Só mostra o botão de enviar mensagem se o usuário tiver setor
          ?
          <TouchableOpacity
            style={styles.button}
            activeOpacity={.95}
            onPress={() => { navigation.navigate('NewCardScreen') }}
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

//Tela do Perfil
export function PerfilScreen() {
  const { user } = useContext(AuthenticatedUserContext);
  console.log(user)
  if (usuario.setor.length != 0) {
    return (
      <View style={styles.container2}>
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={{
            uri: user.photoURL
          }}
        />
        <Text>Usuário: {user.displayName}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Setor: {usuario.setor[0]} {usuario.setor[1]} </Text>
      </View>
    )
  } else {
    return (
      <View style={styles.container2}>
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={{
            uri: user.photoURL
          }}
        />
        <Text>Usuário: {user.displayName}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Turma: {usuario.ano}° {usuario.curso} {usuario.turno} </Text>
      </View>
    )
  }
}

//Componente lateral
function DrawerComponent(props) {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: "#2F9E41" }}>
      <DrawerItemList {...props} drawerInactiveTintColor="#fff" />
      <DrawerItem
        label="Sair"
        inactiveTintColor="#cd191e"
        onPress={() => {
          return auth.signOut();
        }}
      />
    </DrawerContentScrollView>
  );
}

//Drawer navigator
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Recados"
      drawerContent={DrawerComponent}
      screenOptions={{
        drawerInactiveTintColor: "#fff",
        drawerActiveTintColor: "#fff",
        drawerActiveBackgroundColor: "#4ABD5E",
      }}
    >
      <Drawer.Screen name="Recados" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    height: height + 500,
    alignItems: 'flex-end',
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
});