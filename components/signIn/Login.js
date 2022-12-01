import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native';
import 'react-navigation';
import axios from 'axios';

// 로그인 페이지
const Login = ({ navigation }) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={{ flex: 1, backgroundColor: '#89D69D' }}>
            <View style={styles.PageStyle}>
                <View>
                    <Text style={styles.Text}>
                    </Text>
                </View>
                <View>
                    <TextInput style={styles.TextInput} placeholder="ID" onChangeText={(UserEmail) => setEmail(UserEmail)} >
                    </TextInput>
                    <TextInput secureTextEntry={true} style={styles.TextInput} placeholder="Password" onChangeText={(password) => setPassword(password)} />
                </View>
                <TouchableOpacity style={styles.startButton}
                    onPress={() => {
                        navigation.navigate('HomeScreen');
                    }}>
                    <Text style={styles.ButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    startButton: {
        width: 280,
        height: 40,
        paddingTop: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 100,
        borderRadius: 5,

        backgroundColor: "#89D69D"
    },
    Text: {
        color: "#89D69D",
        textAlign: "center",
        marginTop: 150,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 28,
        marginBottom: 60,
        fontFamily: 'Jalnan',
    },
    ButtonText: {
        color: "#FFFFFF",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 4,
        fontSize: 18,
        fontFamily: 'Jalnan',
    },
    TextInput: {
        width: 320,
        height: 50,
        margin: 12,
        borderColor: '#d3d3d3',
        borderWidth: 1,
        padding: 10,
        paddingLeft: 20,
        borderRadius: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 5,
    },
    PageStyle: {
        backgroundColor: 'white',
        width: 380,
        height: 740,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
});

export default Login;