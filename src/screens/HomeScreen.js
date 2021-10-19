import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { IconButton } from '../components';
import Firebase from '../../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import Card from "../components/card";
import data from "../../assets/data.json"


const auth = Firebase.auth();

export default function HomeScreen() {
  
  const { user } = useContext(AuthenticatedUserContext);
  
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  
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
				/>
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