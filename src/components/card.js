import React from "react";
import {StyleSheet, Modal, Pressable, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import * as Font from 'expo-font';
import {LinearGradient} from 'expo-linear-gradient';

export default class Card extends React.Component {

constructor(props){
	super(props)
}

state = {
	fontsLoaded: false,
	modalVisible: false,
	textHeight: null,
}

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

render(){

	if(!this.state.fontsLoaded) return null; 

	// Imprimindo o texto pela primeira vez e achando o tamanho dele.
	if(this.state.textHeight == null){
		return(
		<View style = {styles.card_container} >
			<View style = {{flexDirection: 'row'}} >
				<Text style = {styles.card_titulo} >{this.props.titulo}</Text>
				<Text style = {styles.card_data} >{this.props.data}</Text>
			</View>
			<View style = {styles.card_line} />
			<Text 
				style = {styles.card_text} 
				onLayout={ (event) => { this.setState({ textHeight: event.nativeEvent.layout.height }) }}
			>{this.props.texto}</Text>
		</View>
	)}
	// Se o texto couber no card faça isso:
	if(this.state.textHeight <= 121){
		return(
			<TouchableOpacity 
			style = {[styles.card_container, {paddingBottom: 10}]}  
			activeOpacity = {0.95}
			onPress = {() => this.setState({ modalVisible: true })}
		>
			<Text style = {styles.card_titulo} >{this.props.titulo} <Text style = {styles.card_data} >{this.props.data}</Text></Text>
			{/* Ficou meio confuso esse Text do Título, mas se jogar o da data pra baixo ele renderiza diferente e fica feio */}
			<View style = {styles.card_line} />
			<Text style = {[styles.card_text, {maxHeight: (13 * 9) }]} >{this.props.texto}</Text>
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.state.modalVisible}
				onRequestClose={() => {
                console.log("Modal has been closed")
                this.setState({ modalVisible: false });
        	}}>
            <View style={styles.card_overlay_container}>
                <Pressable
                    style = {{
                        height: '40%',
                        width: '100%',
                    }}
                    onPress={() => this.setState({ modalVisible: false }) }
                />
                <View style={styles.card_overlay_background}>
                    <View style = {{width: '95%', height: '98%'}}>
                        <Text style = {[styles.card_titulo, {fontSize: 24}]}>{this.props.titulo}</Text>
                        <Text style = {styles.card_overlay_data} >
                            <Text style = {{color: '#CD191E'}} >{this.props.info1}</Text> - {this.props.data}
                        </Text>
                        <Text style = {[styles.card_overlay_data, {textAlign: 'justify'}]} >{this.props.info2}</Text>
                        <View style = {styles.card_line} />
                        <ScrollView>
                            <Text style = {[styles.card_text, {marginHorizontal: '1.5%'}]} >{this.props.texto}</Text>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
		</TouchableOpacity>
	)}

	// Se o texto não couber no card faça isso:
	if(this.state.textHeight > 121){
		return(	
		<TouchableOpacity 
			style = {styles.card_container}  
			activeOpacity = {0.95}
			onPress = {() => this.setState({ modalVisible: true })}
		>
			<Text style = {styles.card_titulo} >{this.props.titulo} <Text style = {styles.card_data} >{this.props.data}</Text></Text>
			{/* Ficou meio confuso esse Text do Título, mas se jogar o da data pra baixo ele renderiza diferente e fica feio */}
			<View style = {styles.card_line} />
			<Text style = {[styles.card_text, {maxHeight: (13 * 9) }]} >{this.props.texto}</Text>
			<LinearGradient colors={['rgba(255,255,255,0)', '#fff',]} style={styles.card_gradient}/>
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.state.modalVisible}
				onRequestClose={() => {
                console.log("Modal has been closed")
                this.setState({ modalVisible: false });
        	}}>
            <View style={styles.card_overlay_container}>
                <Pressable
                    style = {{
                        height: '40%',
                        width: '100%',
                    }}
                    onPress={() => this.setState({ modalVisible: false }) }
                />
                <View style={styles.card_overlay_background}>
                    <View style = {{width: '95%', height: '98%'}}>
                        <Text style = {[styles.card_titulo, {fontSize: 24}]}>{this.props.titulo}</Text>
                        <Text style = {styles.card_overlay_data} >
                            <Text style = {{color: '#CD191E'}} >{this.props.info1}</Text> - {this.props.data}
                        </Text>
                        <Text style = {[styles.card_overlay_data, {textAlign: 'justify'}]} >{this.props.info2}</Text>
                        <View style = {styles.card_line} />
                        <ScrollView>
                            <Text style = {[styles.card_text, {marginHorizontal: '1.5%'}]} >{this.props.texto}</Text>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
		</TouchableOpacity>
	)}
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
		width: '100%',
		flex: 1,
		marginVertical: 10,
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		paddingBottom: 30,
  	},
 	card_titulo: {
		color: '#2F9E41',
		fontSize: 20,
		fontWeight: '100',
		fontFamily: 'MerriweatherSans',
		textAlign: 'justify',
  	},
  	card_data: {
	  	fontSize: 12,
	  	color: '#ADADAD',
	 	marginLeft: 11,
	 	fontFamily: 'RobotoRegular',
 	},
 	card_overlay_data: {
		  fontSize: 11,
		  color: '#ADADAD',
		  fontFamily: 'RobotoRegular',
 	},
  	card_line: {
		backgroundColor: '#ADADAD',
	  	height: 2,
	  	borderRadius: 15,
	  	marginBottom: 5,
	  	marginTop: 3,
  	},
  	card_text: {
	  	textAlign: 'justify',
	  	fontFamily: 'MerriweatherRegular',
	  	fontSize: 12,
  	},
  	card_gradient: {
	  	width: '100%',
	  	height: '15%',
	  	marginTop: -15,
  	},
  	card_overlay_container: {
	  	flex: 1,
	  	alignItems: 'center',
	  	justifyContent: 'flex-end',
  	},
  	card_overlay_background: {
	  	backgroundColor: '#fff',
	  	width: '100%',
	  	borderTopEndRadius: 10,
	  	borderTopLeftRadius: 10,
	  	height: '70%',
	  	alignItems: 'center',
	  	justifyContent: 'center',  
  	},
});