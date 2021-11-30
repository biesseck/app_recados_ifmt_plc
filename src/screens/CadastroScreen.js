import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useContext} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Button} from '../components';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { firebase} from '../../config/firebase';
import HomeStack from '../navigation/HomeStack';
import DropDownPicker from 'react-native-dropdown-picker';

export default function CadastroScreen() {

  const { user } = useContext(AuthenticatedUserContext);
  const [doc_user, setDoc_user] = useState(false)

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [ano, setAno] = useState('1');
  const [anos, setAnos] = useState([
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' }
  ]);

  const [curso, setCurso] = useState('Administração');
  const [cursos, setCursos] = useState([
    { label: 'Administração', value: 'Administração' },
    { label: 'Controle Ambiental', value: 'Controle Ambiental' },
    { label: 'Informática', value: 'Informática' }
  ]);

  const [turno, setTurno] = useState('Matutino');
  const [turnos, setTurnos] = useState([
    { label: 'Matutino', value: 'Matutino' },
    { label: 'Vespertino', value: 'Vespertino' },
  ]);

  const CadTurma = () => {
    firebase.firestore().collection('users').doc(user.uid).set({
      ano: ano,
      curso: curso,
      turno: turno,
      setor: [],
    })
      setDoc_user(true)
  }

  if (doc_user == true) {
    return (
      <HomeStack />
    );

  } else {
    return (
      <View style={styles.container}>

        <StatusBar style='dark-content' />

        <Text style={styles.title}> Informe sua Turma </Text>

        <View>
          <DropDownPicker
            open={open}
            value={ano}
            items={anos}
            setOpen={setOpen}
            setValue={setAno}
            setItems={setAnos}
          />
        </View>

        <View style={{ marginTop: 125 }}>
          <DropDownPicker
            open={open1}
            value={curso}
            items={cursos}
            setOpen={setOpen1}
            setValue={setCurso}
            setItems={setCursos}
          />
        </View>

        <View style={{ marginTop: 125 }}>
          <DropDownPicker
            open={open2}
            value={turno}
            items={turnos}
            setOpen={setOpen2}
            setValue={setTurno}
            setItems={setTurnos}
          />
        </View>

        <Button
          onPress={CadTurma}
          backgroundColor='#f57c00'
          title='Cadastrar'
          tileColor='#fff'
          titleSize={24}
          containerStyle={{
            marginTop: 85
          }}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#53b55b',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24
  }
});