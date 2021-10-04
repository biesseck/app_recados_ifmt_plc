import React from "react";
import {StyleSheet, Text, View} from 'react-native';
import * as Font from 'expo-font';
import {LinearGradient} from 'expo-linear-gradient';

export default class TelaInicial extends React.Component {

constructor(props) {
	super(props);
}

state = {
    fontsLoaded: false,	// State pra impedir a tela de carregar antes da fonte;
};

async loadFonts() {		// Função pra carregar as fontes.
	await Font.loadAsync({
		MerriweatherSans: require('../../assets/fonts/MerriweatherSans.ttf'),
		RobotoRegular: require('../../assets/fonts/RobotoRegular.ttf'),
		MerriweatherRegular: require('../../assets/fonts/MerriweatherRegular.ttf'),
	});
	this.setState({ fontsLoaded: true });
}
componentDidMount() {
	this.loadFonts();
}


Card = ({titulo,texto,data,cor}) => { // Componente personalizado pros cards de notificação.
	if(texto.length < 465){
		return(	// TESTA COM A BARRINHA DE COR DO LADO OS VALORES DE TAMANHO ANTES DE CONTINUAR A FAZER ESSA PORRA
		<View style = {styles.card_container} >
			<View style = {{flexDirection: 'row'}} >
				<Text style = {styles.card_titulo} >{titulo}</Text>
				<Text style = {styles.card_data} >{data}</Text>
			</View>
			<View style = {styles.card_line} />
			<View style = {styles.card_text_container} >
				<Text style = {styles.card_text} >{texto}</Text>
			</View>
		</View>
	)}
	if(texto.length >= 465){
		return(	
		<View style = {styles.card_container} >
			<View style = {{flexDirection: 'row'}} >
				<Text style = {styles.card_titulo} >{titulo}</Text>
				<Text style = {styles.card_data} >{data}</Text>
			</View>
			<View style = {styles.card_line} />
			<View style = {styles.card_text_container} >
				<Text style = {styles.card_text} >{texto.substring(0,465)}</Text>
			</View>
			<LinearGradient colors={['rgba(255,255,255,0)', '#fff',]} style={styles.linearGradient}/>
		</View>
	)}
}

render() {
	if(this.state.fontsLoaded){
  	return (
		<View style = {styles.container}>
			<this.Card
				titulo = {'Título'}
				texto = {'pretium pelletum. Nullam.Lorem ipsum dolor sit amet, consectetur Nullam.Lorem ipsum dolor sit amet, Nullam.Lorem ipsum dolor sit amet,   adipiscing elit. Aenean sagittis augue id felis semper sodales eu id diam. Phasellus tristique mollis sem. Duis ut condimentum augue, sit amet hendrerit mauris. Quisque posuere feugiat ipsum sit amet vehicula. Integer tincidunt pretium pellentesque. Vestibulum viverra hendrerit ipsum vel dictum. Nullam sed nibh sit amet odio sodales dictum in non velit.'}
				data = {'dd/mm/aaaa'}
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
		flex: -1,
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		maxHeight: '28%'
	},
	card_titulo: {
		color: '#2F9E41',
		fontSize: 20,
		fontWeight: '100',
		fontFamily: 'MerriweatherSans'
	},
	card_data: {
		fontSize: 12,
		color: '#ADADAD',
		marginLeft: 11,
		fontFamily: 'RobotoRegular',
	},
	card_line: {
		backgroundColor: '#ADADAD',
		height: 2,
		borderRadius: 15,
		marginBottom: 5,
		marginTop: 3,
	},
	card_text_container: {

	},
	card_text: {
		textAlign: 'justify',
		fontFamily: 'MerriweatherRegular',
		fontSize: 12,
	},
	linearGradient: {
		width: '100%',
		height: '15%',
		marginTop: -40,
	},
});