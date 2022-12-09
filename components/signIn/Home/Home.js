import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import { LogBox } from 'react-native';
import 'react-navigation';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { Card } from 'react-native-paper';
// 홈 화면
const Home = ({ navigation }) =>{
    const [sliderTime, setSliderTime] = useState(1);
    const [mentorList, setMentorList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [role, setRole] = useState('');
    useEffect(() => {
    }, [])
    useEffect(() => {
        return () => {
            console.log('unmount');
        }
    }, [])
    LogBox.ignoreAllLogs(true);
    return (
        <View style={{ flex: 1, backgroundColor: '#89D69D' }}>
            <View style={styles.PageStyle}>
                <View style={{ flex: 1 }}>
                </View>
                <View>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {},
    frontTitle: {
        marginLeft: 20,
        marginTop: 20,
        fontFamily: 'NanumSquareRoundB',
        fontSize: 18,
        color: '#89D69D'
    },
    Title: {
        marginLeft: 5,
        marginTop: 20,
        fontFamily: 'NanumSquareRoundB',
        fontSize: 18,
        color: 'black'
    },
    PostTitle: {
        marginLeft: 20,
        marginTop: -10,
        fontFamily: 'NanumSquareRoundB',
        fontSize: 18,
        color: 'black'
    },
    ProfileImage: {
        width: 80,
        height: 80,
        borderRadius: 80,
        marginLeft: 20,
        marginTop: 20,
    },
    nickname: {
        fontSize: 20,
        fontFamily: 'NanumSquareRoundB',
        marginLeft: 20,
        marginTop: 20,
        color: 'black'
    },
    TeachIcon: {
        width: 17,
        height: 17,
        marginTop: 10,
        marginLeft: 20,
    },
    MajorIcon: {
        width: 20,
        height: 20,
        marginTop: 20,
        marginLeft: 20,
    },
    lectures: {
        fontSize: 15,
        fontFamily: 'NanumSquareRoundB',
        marginLeft: 20,
        color: 'black',
    },
    major: {
        fontSize: 15,
        fontFamily: 'NanumSquareRoundB',
        marginTop: 20,
        marginLeft: 20,
        color: 'black'
    },
    star: {
        width: 30,
        height: 30,
    },
    averageRating: {
        marginLeft: 20,
        marginTop: 5,
        fontFamily: 'NanumSquareRoundB',
        fontSize: 20,
        color: 'black',
    },
    RatingText: {
        marginLeft: 20,
        fontFamily: 'NanumSquareRoundB',
        fontSize: 17,
        marginTop: 30,
        color: 'black',
    },
    titleText: {
        marginLeft: 20,
        fontFamily: 'NanumSquareRoundB',
        fontSize: 17,
        marginTop: 30,
        color: 'black',
    },
    contentText: {
        marginLeft: 20,
        fontFamily: 'NanumSquareRoundB',
        fontSize: 15,
        marginTop: 30,
        color: '#a0a0a0',
    },
    countText : {
        marginLeft: 'auto',
        marginRight : 20,
        marginTop : 40,
        fontFamily: 'NanumSquareRoundB',
        fontSize: 15,
        color : 'black',
    },
    PageStyle: {
        backgroundColor: 'white',
        width: '96%',
        height: '98%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
})


export default Home;