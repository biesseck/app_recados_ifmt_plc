import React from "react";
import {StyleSheet, Text, View} from 'react-native';
import * as Font from 'expo-font';

export default class TelaInicial extends React.Component {

constructor(props) {
	super(props);
}

state = {
    fontsLoaded: false,
  };

  async loadFonts() {
    await Font.loadAsync({
      MerriweatherSans: require('../../assets/fonts/MerriweatherSans.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }


Card = ({titulo,texto,data,cor}) => (
	<View style = {styles.card_container} >
		<Text style = {styles.card_titulo} >{titulo}</Text>
		<Text style = {styles.card_data} >{data}</Text>
	</View>
)

render() {

	if(this.state.fontsLoaded){
  	return (
		<View style = {styles.container}>

			<this.Card
				titulo = {'Título'}
				texto = {'LOREM IPSUM'}
				data = {'02/10/2021'}
				cor = {'#0f0'}
			/>

		</View>
	);}
	else return null
}
}

const styles = StyleSheet.create({
  	container: {
    	flex: 1,
    	backgroundColor: '#2F9E41',
    	alignItems: 'center',
    	justifyContent: 'center',
  	},
	card_container:{
		backgroundColor: '#fff',
		padding: 10,
		paddingTop: 2,
		width: '90%',
		height: '20%',
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	card_titulo: {
		color: '#2F9E41',
		fontSize: 20,
		fontWeight: '100',
		fontFamily: 'MerriweatherSans'
	}
});