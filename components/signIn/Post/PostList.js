import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, TouchableOpacity, FlatList, Text, StyleSheet, Image, RefreshControl, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import filter from 'lodash.filter';
import FastImage from 'react-native-fast-image';
import { Card } from 'react-native-paper'
import { CommonActions } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/ko';

const PostList = ({ navigation }) => {

  return (
    <View style={{ flex: 1, backgroundColor: '#89D69D' }}>
      <View style={styles.PageStyle}>
        <View style={{ display : 'flex', flexDirection: 'row', marginTop: 10 }}>
          <Text style={styles.MainTitle}>게시글 목록</Text>
          <TouchableOpacity style={{display : 'flex', marginLeft : 'auto', marginRight : 10, marginTop: 10}}>
            <Text style={styles.writeText} onPress={()=> {navigation.navigate("PostWrite")}}>글쓰기</Text>
          </TouchableOpacity>
        </View>
        <View>
            <Searchbar
                placeholder="Search"
                style={{ marginLeft: 17, width: 200, height: 40 }}
            />
        </View>
        <View style={{ flexgrow: 1 }}>
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}>
          </FlatList>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  cards: {
    borderRadius: 10,
    width: 370,
    height: 200,
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
  content: {
    fontSize: 15,
    fontFamily: 'NanumSquareRoundB',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    color: '#a0a0a0'
  },
  Button: {
    width: 80,
    height: 40,
    backgroundColor: "#27BAFF",
    borderColor: 'black',
    borderRadius: 10,
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
export default PostList;