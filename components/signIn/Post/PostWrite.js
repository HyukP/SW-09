import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, TouchableOpacity, FlatList, Text, StyleSheet, Image, RefreshControl, ScrollView, TextInput} from 'react-native';
import { Searchbar } from 'react-native-paper';
import filter from 'lodash.filter';
import FastImage from 'react-native-fast-image';
import { Card } from 'react-native-paper'
import { CommonActions } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import 'moment/locale/ko';
import 'react-navigation';

const PostWrite = ({navigation}) => {
    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');
    const [address, setAddress] = useState('');
    const renderAddress = () => {
        if(AsyncStorage.getItem('location')!=null){
            setAddress(AsyncStorage.getItem('location'));
        } else setAddress('');
        return (
            <View>
                <Text>{address}</Text>
            </View>
        )
    }
    return (
        <View style = {{flex : 1, backgroundColor : '#89D69D'}}>
            <View style = {styles.PageStyle}>
            <Text style={styles.Text}>게시글 쓰기</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity 
                    onPress={()=>navigation.dispatch(CommonActions.reset({
                        index : 0,
                        routes : [{name : 'Post'}]
                    }))}
                    style={{ marginLeft: 30, marginRight: 5 }}>
                    <Text style={styles.ExitText}>X</Text>
                </TouchableOpacity>
                <Text style={styles.PostText}>글 쓰기</Text>
                <TouchableOpacity style={styles.Button} onPress={() => { WritePost(Title, Content, navigation); }}>
                    <Text style={styles.ButtonText}>작성</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 40 }}>
                <RNPickerSelect
                    onValueChange={(value => console.log(value))} items={[
                        {label : '팔달관', value:'팔달관'},
                        {label : '원천관', value:'원천관'},
                        {label : '성호관', value:'성호관'},
                        {label : '원천관', value:'원천관'},
                        {label : '신학회관', value:'신학회관'}
                    ]}/>
                <Text style={styles.Text}>상세주소</Text>
                <TextInput style={styles.TitleInput}></TextInput>
            </View>
            <View>
            <TouchableOpacity onPress={()=> {navigation.navigate('Map');}}>
                    <Text>Test map</Text>
                    {renderAddress}
                </TouchableOpacity>
            </View>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    TitleInput: {
        width: 350,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20
    },
    TextInput: {
        width: 350,
        height: 350,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20

    },
    Text: {
        color: "#89D69D",
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 15,
        fontFamily: 'Jalnan',

    },
    Button: {
        width: 80,
        height: 40,
        backgroundColor: "#89D69D",
        borderColor: 'black',
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 10,
    },
    ButtonText: {
        color: "white",
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
        fontSize: 15,
        fontFamily: 'Jalnan',

    },
    ExitText: {
        color: "black",
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
        fontSize: 15,
        fontFamily: 'Jalnan',

    },
    AnotherText: {
        color: "#89D69D",
        marginTop: 20,
        marginLeft: 30,
        fontSize: 15,
        fontFamily: 'Jalnan',

    },
    PostText: {
        color: "#89D69D",
        marginTop: 10,
        marginLeft: 30,
        fontSize: 15,
        fontFamily: 'Jalnan',

    },
    PageStyle: {
        backgroundColor: 'white',
        width: '96%',
        height: '98%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius : 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto'
      },
});
export default PostWrite;