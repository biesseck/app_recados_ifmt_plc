import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { firebase, auth } from '../../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import Constants from 'expo-constants';

export default function NewCard() {

  const { user } = useContext(AuthenticatedUserContext);

  const [open, setOpen] = useState([false]);

  const [setor, setSetor] = useState(null);
  const [setores, setSetores] = useState([]);

  const [turno, setTurno] = useState(null);
  const [turnos, setTurnos] = useState([
    { label: 'Todos', value: ''},
    { label: 'Mat', value: 'Matutino' },
    { label: 'Vesp', value: 'Vespertino' },
  ]);

  const [curso, setCurso] = useState(null);
  const [cursos, setCursos] = useState([
    { label: 'Todos', value: ''},
    { label: 'ADM', value: 'Administração' },
    { label: 'CTA', value: 'Controle Ambiental' },
    { label: 'INF', value: 'Informática' }
  ]);

  const [ano, setAno] = useState(null);
  const [anos, setAnos] = useState([
    { label: 'Todos', value: ''},
    { label: '1º', value: '1' },
    { label: '2º', value: '2' },
    { label: '3º', value: '3' }
  ]);

  const [titulo, setTitulo] = useState('');
  const [content, setContent] = useState('');

  const getSetores = () => {

    var setoresTemp = [];

    firebase.firestore().collection('users').doc(user.uid).get()
        .then(doc => {
          doc.data().setor.forEach(v => {
            setoresTemp.push({
              label: v,
              value: v
            })
          })
          setSetores(setoresTemp);
          setSetor(setoresTemp[0].value)
        })
  }

  const sendCard = () => {
    firebase.firestore().collection('recados').add({
      ano_dest: ano,
      curso_dest: curso,
      turno_dest: turno,
      remetente: setor,
      texto: content,
      titulo: titulo,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
    });
    console.log('fui apertado')
  }

  useEffect(() => {
    getSetores()
  }, []);
  
  return (
    <View style={styles.container}>
      <View style = {styles.container_row} >
        <Text style = {styles.text} >De: </Text>
        <View // Precisa tar aqui pro FlexBox funcionar direito no DropDownPicker
          style = {{width: '90%'}}
        >
          <DropDownPicker
            zIndex={4000}
            zIndexInverse={1000}        
            style = {styles.picker_main}
            textStyle = {styles.text}
            dropDownContainerStyle = {styles.picker_dropDown}
            placeholder = {''}
            showTickIcon={false}
            open={open[0]}
            value={setor}
            items={setores}
            setOpen={(v) => {setOpen([v, false, false, false])}}
            setValue={setSetor}
            setItems={setSetores}
          />
        </View>
      </View>
      <View style = {styles.container_row} >
        <Text style = {styles.text} >Para: </Text>
        <View // Precisa tar aqui pro FlexBox funcionar direito no DropDownPicker
          style = {{width: '25%'}}
        >
          <DropDownPicker
            zIndex={3000}
            zIndexInverse={2000}  
            style = {styles.picker_main}
            textStyle = {styles.text}
            dropDownContainerStyle = {styles.picker_dropDown}
            placeholder = {'Ano'}
            placeholderStyle = {{color: '#777'}}
            showTickIcon={false}
            open={open[1]}
            value={ano}
            items={anos}
            setOpen={(v) => {setOpen([false, v, false, false])}}
            setValue={setAno}
            setItems={setAnos}
          />
        </View>
        <View // Precisa tar aqui pro FlexBox funcionar direito no DropDownPicker
          style = {{width: '30%'}}
        >
          <DropDownPicker
            zIndex={2000}
            zIndexInverse={3000}  
            style = {styles.picker_main}
            textStyle = {styles.text}
            dropDownContainerStyle = {styles.picker_dropDown}
            placeholder = {'Curso'}
            placeholderStyle = {{color: '#777'}}
            showTickIcon={false}
            open={open[2]}
            value={curso}
            items={cursos}
            setOpen={(v) => {setOpen([false, false, v, false])}}
            setValue={setCurso}
            setItems={setCursos}
          />
        </View>
        <View // Precisa tar aqui pro FlexBox funcionar direito no DropDownPicker
          style = {{width: '30%'}}
        >
          <DropDownPicker
            zIndex={1000}
            zIndexInverse={4000}  
            style = {styles.picker_main}
            textStyle = {styles.text}
            dropDownContainerStyle = {styles.picker_dropDown}
            placeholder = {'Turno'}
            placeholderStyle = {{color: '#777'}}
            showTickIcon={false}
            open={open[3]}
            value={turno}
            items={turnos}
            setOpen={(v) => {setOpen([false, false, false, v])}}
            setValue={setTurno}
            setItems={setTurnos}
          />
        </View>
      </View>
      <TextInput
        value = {titulo}
        onChangeText = {setTitulo}
        placeholder = {'Título'}
        style = {{
          width: '95%',
          backgroundColor: '#eee',
          borderRadius: 10,
          paddingHorizontal: 10,
          height: 50,
          fontSize: 20 
        }}
      />
      <TextInput
        value = {content}
        onChangeText = {setContent}
        placeholder = {'Mensagem'}
        multiline = {true}
        style = {{
          marginTop: 10, 
          width: '95%',
          paddingHorizontal: 10,
          fontSize: 20, 
          textAlignVertical: 'top',
          flex: -1,
          minHeight: '50%'
        }}
      />
      <View
        style = {{
          marginBottom: 20,
          marginRight: 20,
          width: '50%',
          height: '10%',
          backgroundColor: '#ddd'
        }}
      >
        <TouchableOpacity
          style = {{
            width: '100%',
            height: '100%',
            borderWidth: 1,
          }}
          onPress = {sendCard}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', //'#2F9E41',//'#53b55b',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight + 10
  },
  text: {
    fontSize: 20,
    height: 50,
    textAlignVertical: 'center',
    color: '#000',
  },
  picker_dropDown: {
    borderRadius: 0,
    width: '110%',
    marginTop: -50,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  picker_main: {
    borderRadius: 0,
    width: '100%',
    borderWidth: 0,
    alignItems: 'center',
    height: 50
  },
  container_row: {
    flexDirection: 'row', 
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});
