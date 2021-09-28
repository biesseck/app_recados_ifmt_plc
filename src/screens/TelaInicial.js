import React from "react";
import {Button, Text, View} from 'react-native';


export default class TelaInicial extends React.Component {
    
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
                >Nome: {this.props.route.params.nome}</Text>

                <Text
                    style={{
                        fontSize: 30,
                    }}
                >Sobrenome: {this.props.route.params.sobrenome}</Text>
        
            </View>
        );
    }
}

