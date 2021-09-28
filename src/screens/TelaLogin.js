import React from "react";
import { Button, View, Text, TextInput } from "react-native";


export default class TelaLogin extends React.Component {
    
    state = {
        nome: '',
        sobrenome: ''
    }

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View>

                <Text
                    style={{
                        fontSize: 30,
                    }}
                >Nome</Text>

                <TextInput
                    style={{
                        fontSize: 30,
                        borderWidth: 1,
                    }}
                    onChangeText={(nome) => this.setState({nome})}
                />

                <Text
                    style={{
                        fontSize: 30,
                    }}
                >Sobrenome</Text>

                <TextInput
                    style={{
                        fontSize: 30,
                        borderWidth: 1,
                    }}
                    onChangeText={(sobrenome) => this.setState({sobrenome})}
                />

                <Button
                    title='Login'
                    onPress={() =>
                        this.props.navigation.navigate(
                            'TelaInicial',
                            {
                                nome: this.state.nome,
                                sobrenome: this.state.sobrenome,
                            }
                        )
                    }
                />
                
           </View>
          );
    }
}
