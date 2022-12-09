import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, TouchableOpacity, FlatList, Text, StyleSheet, Image, RefreshControl, ScrollView } from 'react-native';
import { Searchbar, TextInput } from 'react-native-paper';
import filter from 'lodash.filter';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import { Card } from 'react-native-paper'
import { CommonActions } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/ko';

const PostEdit = ({ navigation , route}) => {
  var [data, setData] = useState([]);
  const [nickname, setNickName] = useState('');
  const [pickUpTime, setTime] = useState('');
  const [pickUpLocation, setPickUpLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [foodName, setFoodName] = useState('');
  const [subFoodName, setSubFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [subFoodPrice, setSubFoodPrice] = useState('');
  const [postType, setPostType] = useState('');
  const [place, setPlace] = useState('');
  const [username,setUserName] = useState('');
  const [id, setId] = useState('');
  const getUserName = async () => {
    var username = await AsyncStorage.getItem('username');
    setUserName(username);
  }
  useEffect(() => {
    getUserName();
    axios.get('http://10.0.2.2:8090/post/get/'+route.params.id).then(response => {
        setNickName(response.data.data.authorNickName);
        setTime(response.data.data.pickUpTime);
        setPickUpLocation(response.data.data.pickupLocation);
        setLatitude(response.data.data.food[0].foodlocation.split(',')[0]);
        setLongitude(response.data.data.food[0].foodlocation.split(',')[1]);
        setFoodName(response.data.data.food[0].foodname);
        setSubFoodName(response.data.data.food[1].foodname);
        setFoodPrice(response.data.data.food[0].foodprice);
        setSubFoodPrice(response.data.data.food[1].foodprice);
        setPostType(response.data.data.postType);
        setId(response.data.data.id);
        getAddress();
    });
    const getAddress = async () => {
        await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' +
            latitude + ',' + longitude + '&key=' + 'AIzaSyCb_m2mZveyK0Ot2vXFeOqa_uM8ICvauyM&callback=initMap&language=ko'
        ).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson.results[0]);
            setPlace(responseJson.results[0]?.formatted_address);
        })
    }
}, [latitude,longitude]);
const delivery = () => {
    axios.get('http://10.0.2.2:8090/post/delivery?postId='+id,{
        method : 'POST',
    }).then(response => {
        if(response.status==200){
            alert("배달 수락에 성공했습니다!");
            navigation.dispatch(CommonActions.reset({
                index : 0,
                routes : [{name : 'Post'
                }],
            }))
        } else {
            alert("배달 수락에 실패했습니다!");
        }
      })
}
const renderExitButton = (postType) => {
    if(postType=='DELIVERY'&&username==nickname) {
        styles.Button.marginLeft = 10;
        return (
            <TouchableOpacity style = {styles.Button3}onPress={()=>{
            }}>
            <Text style = {styles.ButtonText3}>배달 종료</Text>
        </TouchableOpacity>   
        )
    } else {
        styles.Button.marginLeft = 'auto';
        return (
            <View></View>
        )
    }
}
  return (
    <View style={{ flex: 1, backgroundColor: '#89D69D' }}>
      <ScrollView style={styles.PageStyle}>
        <View>
            <View style={{display : 'flex', flexDirection : 'row'}}>
                <Text style={styles.content}>요청자 : {nickname}</Text>
                {renderExitButton(postType)}
                <TouchableOpacity style = {styles.Button}onPress={()=>{
                        if(username==nickname){
                            alert("요청자는 배달을 수락할 수 없습니다.");
                        } else if(postType=="DELIVERY"){
                            alert("진행중인 배달은 수락할 수 없습니다.");
                        } else {
                            delivery();
                        }
                    }}>
                    <Text style = {styles.ButtonText}>배달 수락</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.content}>장소 : {pickUpLocation}</Text>
                <Text style={styles.content2}>요청 시간 : {pickUpTime}</Text>
                <Text style={styles.content}>주문 음식 : {foodName}</Text>
                <Text style={styles.content2}>주문 음식 가격 : {foodPrice}</Text>
                <Text style={styles.content}>주문 대체 음식 : {subFoodName}</Text>
                <Text style={styles.content2}>주문 대체 음식 가격 : {subFoodPrice}</Text>
                <Text style={styles.content}>음식점 장소 : {place}</Text>
                <FastImage source={{uri : 
                    'https://maps.googleapis.com/maps/api/staticmap?center='+String(latitude)+","+String(longitude)+'&size='+styles.staticMap.height+'x'+styles.staticMap.width+'&markers=color:red%7Clabel:C%7C'+String(latitude) + ',' + String(longitude)+'&zoom=13&maptype=roadmap&key=AIzaSyCb_m2mZveyK0Ot2vXFeOqa_uM8ICvauyM', cache : FastImage.cacheControl.web}}
                        style={styles.staticMap}
                />
            </View>
        </View>
        <View>
            <Text style={styles.content}>댓글 작성</Text>
            <View style={{display : 'flex', flexDirection : 'row'}}>
                <TextInput style={styles.TextInput}></TextInput>
                <TouchableOpacity style = {styles.Button2}>
                    <Text style = {styles.ButtonText2}>댓글 작성</Text>
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  cards: {
    borderRadius: 10,
    width: 370,
    height: 160,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 'auto',
  },
  nickname: {
    fontSize: 14,
    fontFamily: 'Jalnan',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    color: 'black'
  },
  TextInput: {
    width: 250,
    height: 30,
    margin: 12,
    backgroundColor : 'white',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginLeft: '2%',
    marginRight: 'auto',
    marginBottom: 20
},
  MainTitle: {
    color: "#89D69D",
    fontSize: 17,
    fontFamily: 'Jalnan',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  writeText :{
    color: "#89D69D",
    fontSize: 15,
    fontFamily: 'Jalnan',
    margin : 'auto'
  },
  item: {
    width: '97%',
    marginRight: 'auto',
    marginBottom: 5,
  },
  title: {
    fontSize: 15,
    fontFamily: 'NanumSquareRoundB',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    color: 'black'
  },
  staticMap :{
    margin : 'auto',
    width : 250,
    height : 250,
    marginLeft : 'auto',
    marginRight : "auto",
    display : 'flex',
},
  content: {
    fontSize: 15,
    fontFamily: 'NanumSquareRoundB',
    marginLeft: 10,
    marginTop : 30,
    color: 'black'
  },
  content2: {
    fontSize: 15,
    fontFamily: 'NanumSquareRoundB',
    marginBottom: 10,
    marginLeft: 10,
    color: 'black'
  },
  Button: {
    width: 80,
    height: 40,
    backgroundColor: "#89D69D",
    borderColor: 'black',
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop : 'auto'
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
  Button3: {
    width: 80,
    height: 40,
    backgroundColor: "#89D69D",
    borderColor: 'black',
    borderRadius: 5,
    marginLeft: 'auto',
    marginTop : 'auto'
  },
  ButtonText3: {
    color: "white",
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    fontSize: 15,
    fontFamily: 'Jalnan',
  },
  Button2: {
    width: 80,
    height: 40,
    backgroundColor: "#89D69D",
    borderColor: 'black',
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 10,
    marginTop : 'auto',
    marginBottom : 'auto',
  },
  ButtonText2: {
    color: "white",
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
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
export default PostEdit;