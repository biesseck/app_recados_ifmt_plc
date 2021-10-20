import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { IconButton } from '../components';
import { firebase, auth } from '../../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import Card from "../components/card";
import data from "../../assets/data.json"

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
      const recadosRecebidos = firebase
      .firestore()
      .collection('recados')
      .onSnapshot((snapshot) => {
        const recadosList = snapshot.docs.map((doc) => ({
          id: doc.id,
          titulo: doc.data().titulo,
          data: doc.data().data,
          info1: doc.data().info1,
          info2: doc.data().info2,
          texto: doc.data().texto
        }));
        setRecados(recadosList);
      }, () => {
        setError(true)
      });
      setLoading(false);
      // return() => recadosRecebidos();
      
    } catch (err) {
      Alert.alert("Erro ao consultar os recados!!!", err.message);
    }
  };


  // Funcao executada quando a tela e' carregada
  useEffect(() => {
    getRecados()
  }, []);
  

  
  return (
		<View style = {styles.container}>
      <View style={styles.row}>
        <IconButton
          name='logout'
          size={24}
          color='#fff'
          onPress={handleSignOut}
        />
      </View>

			<View style = {styles.flatlist_container}>

      <FlatList
					data = {recados}
					renderItem = {({item}) => (
						<Card
							texto = {item.texto}
							titulo = {item.titulo}
							data = {item.data}
							info1 = {item.info1}
							info2 = {item.info2}
						/>
					)}
				/>

        {/* <FlatList
					data = {data.database}
					renderItem = {({item}) => (
						<Card
							texto = {item.texto}
							titulo = {item.titulo}
							data = {item.data}
							info1 = {item.info1}
							info2 = {item.info2}
						/>
					)}
				/> */}
			</View>
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
    marginBottom: 24,
  },
  flatlist_container: {
		width: '100%',
		height: '100%',
	}
});