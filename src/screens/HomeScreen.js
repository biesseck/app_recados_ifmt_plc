import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Pressable, Image, ImageBackground, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button, IconButton } from '../components';
import { firebase, auth } from '../../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import filter from 'lodash.filter'
import Card from "../components/card";
import Constants from 'expo-constants';
const { height } = Dimensions.get('window');

const user_curso = 'Informática'
const user_turno = 'Matutino'
const user_ano = '2'

export default function HomeScreen() {
  const { user } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  const [recados, setRecados] = useState([]); 
  const [pesquisa, setPesquisa] = useState('')
  const [fullData, setFullData] = useState([])

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const getRecados = async () => {
    try {

      const recadosRef = firebase.firestore().collection('recados');
      const snapshot = await recadosRef.orderBy('timestamp', 'desc').get()
      const recadosList = new Array()

      // Filtragem dos recados por curso, ano e turma;
      snapshot.forEach(doc => {
        if(  (doc.data().curso_dest == user_curso 
          || doc.data().curso_dest == '')
          && (doc.data().ano_dest == user_ano
          || doc.data().ano_dest == '')
          && (doc.data().turno_dest == user_turno
          || doc.data().turno_dest == ''))
          recadosList.push(doc)
      })

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
      setPesquisa('')
      setLoading(false)
      setRecados(fullData)

    } catch (err) {
      Alert.alert("Erro ao consultar os recados!!!", err.message);
    }
  };

  const contem = (doc,query) => {
    let i = false;
    Object.values(doc).forEach(value => {
      if (i) return true
      if (doc.id == value){
        return;
      } else if (typeof value === 'string' || value instanceof String){
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
      return contem(doc,normalQuery)
    })
    setPesquisa(text)
    setRecados(data)
  }

  // Funcao executada quando a tela e' carregada
  useEffect(() => {
    getRecados()
  }, []);
  
  return (
		<ImageBackground 
      style = {styles.container}
      source = {require('../../assets/background_homeScreen.png')}  
    >
      <View style = {styles.header_container}>
        <View style = {{flexDirection: 'row', justifyContent: 'center', height: '35%', alignItems: 'center'}}>
          <Image
            style = {styles.logo}
            source = {require('../../assets/iflogo_white_40x53.png')}
          />
          <View style = {styles.searchBar}>
            <Image
              style = {styles.searchIcon}
              source = {require('../../assets/searchIcon.png')}
            />
            <TextInput style = {styles.searchBar_input} 
              onChangeText = {handleSearch}
              value = {pesquisa}
              placeholder = 'Pesquisar'
            />
            <Pressable
              onPress = {() => handleSearch('')}
              style = {{paddingVertical: 10 // Deixa o botão mais fácil de apertar 
              }}
            >
              <Image
                style = {{marginRight: 5}}
                source = {require('../../assets/crossIcon.png')}
              />
            </Pressable>
          </View>
        </View>
      </View>
			<View style = {styles.flatlist_container}>
      { recados.length == 0   // Se nao houver mensagens, exibe uma mensagem ao usuario
        ? <View style = {{alignItems: 'center'}}>
            <Text style = {{fontSize: 20, color: '#FFF'}}>Nenhuma mensagem</Text>
            <Text></Text>
            <Button
              onPress={() => {getRecados();}}
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
            data = {recados}
            renderItem = {({item}) => (
              <Card
                texto = {item.texto}
                titulo = {item.titulo}
                timestamp = {item.timestamp}
                info1 = {item.remetente}
                info2 = {'ao ' +
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
		height: '100%',
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
	}
});