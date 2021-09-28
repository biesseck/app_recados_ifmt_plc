import React from "react";
import { Button, View, Text } from "react-native";


export default class TelaLogin extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View>

                <Text>Text 1</Text>

                <Text>Text 2</Text>

                <Button
                    title='Login'
                    onPress={() =>
                        this.props.navigation.navigate('TelaInicial', { name: 'Jane' })
                    }
                />
                
           </View>
          );
    }
}

