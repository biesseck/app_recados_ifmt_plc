import React, { useState } from 'react';
import { StyleSheet, Image, View, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Constants from 'expo-constants';


export default function Header(){

	const [text, setText] = useState('')

  return(
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
						onChangeText = {(t) => {setText(t)}}
						value = {text}
					/>
					<Pressable
						onPress = {() => setText('')}
						style = {{paddingVertical: 10 /* Deixa o botão mais fácil de apertar */ }}
					>
						<Image
							style = {{marginRight: 5}}
							source = {require('../../assets/crossIcon.png')}
						/>
					</Pressable>
				</View>
			</View>
    </View>
  )
}



const styles = StyleSheet.create({
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