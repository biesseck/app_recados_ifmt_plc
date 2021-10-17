import React from "react";
import {StyleSheet, View, FlatList} from 'react-native';
import Card from "../components/card";
import data from "../../assets/data.json"

export default class TelaInicial extends React.Component {

constructor(props) {
	super(props);
}

render() {
  	return (
		<View style = {styles.container}>
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
}}

const styles = StyleSheet.create({
  	container: {
    	flex: 1,
    	backgroundColor: '#2F9E41',
    	alignItems: 'center',
    	justifyContent: 'center',
  	},
	flatlist_container: {
		width: '95%',
		height: '100%',
	},
});